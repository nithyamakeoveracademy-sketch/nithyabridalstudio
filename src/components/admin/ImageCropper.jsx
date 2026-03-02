import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from '../../lib/supabaseClient';
import { X } from 'lucide-react';

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

export async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return new Promise((resolve, reject) => {
        // WebP conversion, 0.75 quality
        canvas.toBlob((file) => {
            resolve(file);
        }, 'image/webp', 0.75);
    });
}

const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspect = undefined }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const processImageAndUpload = async () => {
        try {
            setIsProcessing(true);
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

            // Upload to Supabase Storage
            const fileName = `image_${Date.now()}.webp`;

            const { data, error } = await supabase.storage
                .from('images')
                .upload(`uploads/${fileName}`, croppedImageBlob, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'image/webp'
                });

            if (error) {
                console.error("Upload error", error);
                throw error;
            }

            // Get Public URL
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(`uploads/${fileName}`);

            onCropComplete(publicUrlData.publicUrl);
        } catch (e) {
            console.error("Error cropping/uploading image:", e);
            alert("Error processing image.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-2xl h-[60vh] md:h-[70vh] bg-black">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect} // Responsive aspect ratio
                    onCropChange={setCrop}
                    onCropComplete={handleCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="w-full max-w-2xl bg-[#111] p-4 flex flex-col gap-4">
                <div>
                    <label className="text-luxury-gold text-xs uppercase mb-2 block">Zoom</label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(e.target.value)}
                        className="w-full"
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 border border-luxury-gold text-luxury-gold uppercase text-sm tracking-wider w-full hover:bg-luxury-gold/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={processImageAndUpload}
                        disabled={isProcessing}
                        className="px-6 py-2 bg-luxury-gold text-black uppercase text-sm tracking-wider font-medium w-full hover:bg-luxury-lightGold disabled:opacity-50"
                    >
                        {isProcessing ? 'Processing...' : 'Crop & Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
