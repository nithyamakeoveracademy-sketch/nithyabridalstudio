import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, Plus, Trash2, X, Upload } from 'lucide-react';
import ImageCropper from '../../components/admin/ImageCropper';

const AdminPortfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({ src: '', category: 'Bridal', height: 'md:h-[500px]' });
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const fileInputRef = useRef(null);

    const fetchPortfolio = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
        if (!error) setItems(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => setCropImageSrc(reader.result));
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (url) => {
        setFormData({ ...formData, src: url });
        setCropImageSrc(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await supabase.from('portfolio').insert([{
            src: formData.src,
            category: formData.category,
            height: formData.height
        }]);

        setIsModalOpen(false);
        fetchPortfolio();
        setFormData({ src: '', category: 'Bridal', height: 'md:h-[500px]' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this portfolio image?")) return;
        await supabase.from('portfolio').delete().eq('id', id);
        fetchPortfolio();
    };

    return (
        <div>
            {cropImageSrc && (
                <ImageCropper
                    imageSrc={cropImageSrc}
                    onCropComplete={handleCropComplete}
                    onCancel={() => {
                        setCropImageSrc(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest">Portfolio</h1>
                <button
                    onClick={() => {
                        setFormData({ src: '', category: 'Bridal', height: 'md:h-[500px]' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-luxury-gold text-luxury-black px-4 py-2 uppercase text-sm tracking-wider font-medium hover:bg-luxury-lightGold transition-colors rounded-lg w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" /> Add Image
                </button>
            </div>

            {loading ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="bg-[#0a0a0a] border border-luxury-gold/10 rounded-xl overflow-hidden shadow-lg animate-pulse inline-block w-full h-[300px] sm:h-[400px]">
                            <div className="w-full h-full bg-white/5"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="relative group break-inside-avoid">
                            <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-lg group hover:border-luxury-gold/50 transition-all">
                                <img src={item.src} alt={item.category} className="w-full object-cover" />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full shadow-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 pt-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-luxury-gold text-xs uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-luxury-gold/30">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-full p-12 text-center text-luxury-nude/50 bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl">
                            No images in portfolio.
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl w-full max-w-lg shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-luxury-gold/10">
                            <h2 className="text-xl font-serif text-luxury-gold uppercase tracking-widest">Add Portfolio Image</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-luxury-nude/50 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none"
                                >
                                    <option value="Bridal">Bridal</option>
                                    <option value="Reception">Reception</option>
                                    <option value="Portrait">Portrait</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Display Height (Desktop)</label>
                                <select
                                    value={formData.height}
                                    onChange={e => setFormData({ ...formData, height: e.target.value })}
                                    className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none"
                                >
                                    <option value="md:h-[400px]">Small (400px)</option>
                                    <option value="md:h-[500px]">Medium (500px)</option>
                                    <option value="md:h-[600px]">Large (600px)</option>
                                    <option value="md:h-[700px]">Extra Large (700px)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2 flex items-center justify-between">
                                    Image
                                    {formData.src && <span className="text-green-500 text-[10px]">Image Uploaded</span>}
                                </label>
                                <div className="border border-dashed border-luxury-gold/30 rounded-lg p-6 bg-[#111] text-center relative overflow-hidden group">
                                    {formData.src ? (
                                        <div className="relative h-48 w-full flex items-center justify-center overflow-hidden">
                                            <img src={formData.src} alt="Preview" className="max-h-full max-w-full rounded" />
                                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-luxury-gold text-black px-4 py-2 rounded text-sm uppercase tracking-wider font-medium hover:bg-luxury-lightGold mb-2">Change Image</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-48">
                                            <Upload className="w-10 h-10 text-luxury-gold/50 mb-4" />
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-luxury-gold uppercase tracking-wider hover:underline bg-white/5 py-2 px-4 rounded border border-luxury-gold/20">Upload & Crop Image</button>
                                            <p className="text-xs text-luxury-nude/30 mt-3 font-light">Uses free crop ratio & WebP format</p>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-luxury-gold/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-luxury-gold text-luxury-gold uppercase tracking-wider text-sm rounded hover:bg-white/5">Cancel</button>
                                <button type="submit" disabled={!formData.src} className="px-6 py-2 bg-luxury-gold text-black uppercase tracking-wider text-sm font-medium rounded hover:bg-luxury-lightGold disabled:opacity-50">Upload & Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPortfolio;
