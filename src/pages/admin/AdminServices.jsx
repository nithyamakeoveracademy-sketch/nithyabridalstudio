import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import ImageCropper from '../../components/admin/ImageCropper';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ id: null, title: '', price: '', desc: '', features: '', img: '' });
    const [imageFile, setImageFile] = useState(null);
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const fileInputRef = useRef(null);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
        if (!error) setServices(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
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
        setFormData({ ...formData, img: url });
        setCropImageSrc(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const featuresArray = formData.features.split('\n').map(f => f.trim()).filter(f => f);

        const serviceData = {
            title: formData.title,
            price: formData.price,
            desc: formData.desc,
            features: JSON.stringify(featuresArray),
            img: formData.img
        };

        if (formData.id) {
            await supabase.from('services').update(serviceData).eq('id', formData.id);
        } else {
            await supabase.from('services').insert([serviceData]);
        }

        setIsModalOpen(false);
        fetchServices();
        setFormData({ id: null, title: '', price: '', desc: '', features: '', img: '' });
    };

    const openEdit = (service) => {
        let featuresObj = [];
        try { featuresObj = JSON.parse(service.features); } catch (e) { }

        setFormData({
            id: service.id,
            title: service.title,
            price: service.price,
            desc: service.desc,
            features: Array.isArray(featuresObj) ? featuresObj.join('\n') : '',
            img: service.img
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        await supabase.from('services').delete().eq('id', id);
        fetchServices();
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
                <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest">Services</h1>
                <button
                    onClick={() => {
                        setFormData({ id: null, title: '', price: '', desc: '', features: '', img: '' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-luxury-gold text-luxury-black px-4 py-2 uppercase text-sm tracking-wider font-medium hover:bg-luxury-lightGold transition-colors rounded-lg w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" /> Add Service
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-[#0a0a0a] border border-luxury-gold/10 rounded-xl overflow-hidden animate-pulse">
                            <div className="h-48 bg-white/5"></div>
                            <div className="p-5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-white/5 rounded w-1/2"></div>
                                    <div className="h-6 bg-white/5 rounded w-1/4"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                                </div>
                                <div className="pt-4 border-t border-luxury-gold/10 flex justify-between mt-2">
                                    <div className="h-5 bg-white/5 rounded w-16"></div>
                                    <div className="h-5 bg-white/5 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-lg group hover:border-luxury-gold/50 transition-colors">
                            <div className="h-48 relative overflow-hidden">
                                {service.img ? (
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-[#111] flex items-center justify-center text-luxury-nude/30">No Image</div>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-serif text-white">{service.title}</h3>
                                    <span className="text-luxury-gold font-medium text-sm border border-luxury-gold/30 px-2 py-0.5 rounded">{service.price}</span>
                                </div>
                                <p className="text-luxury-nude/70 text-sm font-light mb-4 line-clamp-2">{service.desc}</p>

                                <div className="flex justify-between items-center pt-4 border-t border-luxury-gold/10">
                                    <button onClick={() => openEdit(service)} className="text-luxury-gold hover:text-luxury-lightGold flex items-center gap-2 text-sm uppercase tracking-wider">
                                        <Edit2 className="w-4 h-4" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-400 flex items-center gap-2 text-sm uppercase tracking-wider">
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <div className="col-span-full p-12 text-center text-luxury-nude/50 bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl">
                            No services added yet. Click "Add Service" to start.
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-luxury-gold/10">
                            <h2 className="text-xl font-serif text-luxury-gold uppercase tracking-widest">{formData.id ? 'Edit Service' : 'Add Service'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-luxury-nude/50 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Price (e.g. ₹15,000)</label>
                                    <input required type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Short Description</label>
                                <textarea required rows="2" value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none resize-none" />
                            </div>

                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Features (One per line)</label>
                                <textarea required rows="5" value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} placeholder="Makeup & Hairstyles&#10;Saree draping & folding" className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none resize-y" />
                            </div>

                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2 flex items-center justify-between">
                                    Service Image
                                    {formData.img && <span className="text-green-500 text-[10px]">Image Uploaded</span>}
                                </label>
                                <div className="border border-dashed border-luxury-gold/30 rounded-lg p-6 bg-[#111] text-center relative overflow-hidden group">
                                    {formData.img ? (
                                        <div className="relative h-32 w-full">
                                            <img src={formData.img} alt="Preview" className="h-full w-full object-cover rounded opacity-50 transition-opacity group-hover:opacity-30" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-luxury-gold text-black px-4 py-2 rounded text-sm uppercase tracking-wider font-medium hover:bg-luxury-lightGold">Replace Image</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-32">
                                            <Upload className="w-8 h-8 text-luxury-gold/50 mb-2" />
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-luxury-gold uppercase tracking-wider hover:underline">Click to Upload Image</button>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-luxury-gold/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-luxury-gold text-luxury-gold uppercase tracking-wider text-sm rounded hover:bg-white/5">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-luxury-gold text-black uppercase tracking-wider text-sm font-medium rounded hover:bg-luxury-lightGold">
                                    {formData.id ? 'Update Service' : 'Save Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
