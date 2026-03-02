import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, Plus, Trash2, X, Upload } from 'lucide-react';
import ImageCropper from '../../components/admin/ImageCropper';

const AdminAcademy = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({ src: '', category: 'Transformation', name: '' });
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const fileInputRef = useRef(null);

    const CACHE_BUST = '?t=' + new Date().getTime();

    // Configuration for limit per category
    const LIMITS = {
        Transformation: 8,
        Graduation: 8
    };

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('academy_images').select('*').order('created_at', { ascending: false });
        if (!error) setItems(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
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

        // Check limit
        const currentCount = items.filter(item => item.category === formData.category).length;
        if (currentCount >= LIMITS[formData.category]) {
            alert(`You can only have a maximum of ${LIMITS[formData.category]} images for the ${formData.category} category. Please delete an existing image first.`);
            return;
        }

        await supabase.from('academy_images').insert([{
            src: formData.src,
            category: formData.category,
            name: formData.name || null
        }]);

        setIsModalOpen(false);
        fetchItems();
        setFormData({ src: '', category: 'Transformation', name: '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this image?")) return;
        await supabase.from('academy_images').delete().eq('id', id);
        fetchItems();
    };

    const groupedItems = {
        Transformation: items.filter(item => item.category === 'Transformation'),
        Graduation: items.filter(item => item.category === 'Graduation'),
    };

    return (
        <div>
            {cropImageSrc && (
                <ImageCropper
                    imageSrc={cropImageSrc}
                    onCropComplete={handleCropComplete}
                    aspect={formData.category === 'Transformation' ? 4 / 5 : 3 / 4}
                    onCancel={() => {
                        setCropImageSrc(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest">Academy Gallery</h1>
                <button
                    onClick={() => {
                        setFormData({ src: '', category: 'Transformation', name: '' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-luxury-gold text-luxury-black px-4 py-2 uppercase text-sm tracking-wider font-medium hover:bg-luxury-lightGold transition-colors rounded-lg w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" /> Add Image
                </button>
            </div>

            {loading ? (
                <div className="space-y-12">
                    <section>
                        <div className="flex justify-between items-center mb-6 border-b border-luxury-gold/10 pb-4">
                            <h2 className="text-xl font-serif text-white">Student Transformations</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="bg-[#0a0a0a] border border-luxury-gold/10 rounded-xl overflow-hidden shadow-lg aspect-[4/5] animate-pulse">
                                    <div className="w-full h-full bg-white/5"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Transformation Section */}
                    <section>
                        <div className="flex justify-between items-center mb-6 border-b border-luxury-gold/10 pb-4">
                            <h2 className="text-xl font-serif text-white">Student Transformations <span className="text-luxury-gold/50 text-sm ml-2">({groupedItems.Transformation.length} / {LIMITS.Transformation})</span></h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {groupedItems.Transformation.map(item => (
                                <div key={item.id} className="relative group bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-lg aspect-[4/5]">
                                    <img src={item.src + CACHE_BUST} alt="Transformation" className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full shadow-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {groupedItems.Transformation.length === 0 && (
                                <div className="col-span-full p-8 text-center text-luxury-nude/50 bg-[#0a0a0a] border border-luxury-gold/10 rounded-xl">
                                    No transformation images uploaded.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Graduation Section */}
                    <section>
                        <div className="flex justify-between items-center mb-6 border-b border-luxury-gold/10 pb-4">
                            <h2 className="text-xl font-serif text-white">Graduation Day Moments <span className="text-luxury-gold/50 text-sm ml-2">({groupedItems.Graduation.length} / {LIMITS.Graduation})</span></h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {groupedItems.Graduation.map(item => (
                                <div key={item.id} className="relative group bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-lg aspect-[3/4]">
                                    <img src={item.src + CACHE_BUST} alt="Graduation" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-[5]"></div>
                                    <div className="absolute bottom-3 left-3 z-[10]">
                                        <span className="text-luxury-gold text-sm font-serif">{item.name || 'Graduate'}</span>
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full shadow-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {groupedItems.Graduation.length === 0 && (
                                <div className="col-span-full p-8 text-center text-luxury-nude/50 bg-[#0a0a0a] border border-luxury-gold/10 rounded-xl">
                                    No graduation day images uploaded.
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-luxury-gold/10 sticky top-0 bg-[#0a0a0a] z-10">
                            <h2 className="text-xl font-serif text-luxury-gold uppercase tracking-widest">Add Academy Image</h2>
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
                                    <option value="Transformation">Student Transformation</option>
                                    <option value="Graduation">Graduation Day Moment</option>
                                </select>
                            </div>

                            {formData.category === 'Graduation' && (
                                <div>
                                    <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Student Name (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="E.g., Aisha R."
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none"
                                        maxLength={30}
                                    />
                                </div>
                            )}

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

export default AdminAcademy;
