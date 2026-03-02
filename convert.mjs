import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const run = async () => {
    const assetsDir = path.join(process.cwd(), 'src/assets');
    const processDir = async (dir) => {
        let files;
        try {
            files = fs.readdirSync(dir);
        } catch (e) { return; }
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                await processDir(fullPath);
            } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
                try {
                    const ext = path.extname(file);
                    const webpPath = fullPath.replace(new RegExp('\\' + ext + '$', 'i'), '.webp');
                    console.log(`Converting ${file} to .webp`);
                    await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
                    fs.unlinkSync(fullPath);
                } catch (e) {
                    console.log(`Failed converting ${file}`, e);
                }
            }
        }
    };

    const updateCode = async (dir) => {
        let files;
        try {
            files = fs.readdirSync(dir);
        } catch (e) { return; }
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                await updateCode(fullPath);
            } else if (file.match(/\.(jsx|js|css)$/i)) {
                try {
                    let content = fs.readFileSync(fullPath, 'utf8');
                    // Ensure we only replace if it's right before a quote or end of string, 
                    // or just blindly replace since it's an assumption that all images are webp now.
                    // A global replace is fine for this specific task.
                    let newContent = content.replace(/\.(png|jpg|jpeg)/gi, '.webp');
                    if (content !== newContent) {
                        fs.writeFileSync(fullPath, newContent);
                        console.log(`Updated ${file}`);
                    }
                } catch (e) {
                    console.log(`Failed updating ${file}`, e);
                }
            }
        }
    };

    console.log('Starting conversion...');
    await processDir(assetsDir);
    const pubDir = path.join(process.cwd(), 'public');
    await processDir(pubDir);
    console.log('Updating code...');
    await updateCode(path.join(process.cwd(), 'src'));

    console.log('Done!');
};

run();
