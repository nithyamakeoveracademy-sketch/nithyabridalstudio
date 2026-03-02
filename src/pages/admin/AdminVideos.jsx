import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, Plus, Trash2, X, Youtube } from 'lucide-react';

const AdminVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const fetchVideos = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
        if (!error) setVideos(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const extractVideoId = (url) => {
        let videoId = '';
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
        if (match && match[1]) {
            videoId = match[1];
        } else if (url.length === 11) {
            videoId = url;
        }
        return videoId;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            setError('Please enter a valid YouTube URL or Video ID.');
            return;
        }

        if (videos.length >= 3) {
            setError('Maximum 3 videos allowed. Please delete one first.');
            return;
        }

        const { error: dbError } = await supabase.from('videos').insert([{ video_id: videoId }]);
        if (dbError) {
            console.error('Error adding video:', dbError);
            setError('Failed to add video. Please ensure the "videos" table exists.');
        } else {
            setIsModalOpen(false);
            setVideoUrl('');
            fetchVideos();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;
        await supabase.from('videos').delete().eq('id', id);
        fetchVideos();
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-serif text-luxury-gold uppercase tracking-widest">Showcase Videos</h1>
                <button
                    onClick={() => {
                        setVideoUrl('');
                        setError('');
                        setIsModalOpen(true);
                    }}
                    disabled={videos.length >= 3}
                    className={`flex items-center justify-center gap-2 px-4 py-2 uppercase text-sm tracking-wider font-medium transition-colors rounded-lg w-full sm:w-auto ${videos.length >= 3 ? 'bg-luxury-gold/50 cursor-not-allowed text-luxury-black/50' : 'bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold'}`}
                >
                    <Plus className="w-4 h-4" /> Add Video
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <div key={video.id} className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl overflow-hidden shadow-lg group">
                            <div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center">
                                <img src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.webp`} alt="Video Thumbnail" className="w-full h-full object-cover" onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.video_id}/hqdefault.webp`; }} />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors pointer-events-none">
                                    <Youtube className="w-12 h-12 text-luxury-gold drop-shadow-lg" />
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-[#111]">
                                <span className="text-luxury-nude/70 text-sm font-light">ID: {video.video_id}</span>
                                <button onClick={() => handleDelete(video.id)} className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {videos.length === 0 && (
                        <div className="col-span-full p-12 text-center text-luxury-nude/50 bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl">
                            No videos added yet. Click "Add Video" to showcase your work.
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-luxury-gold/20 rounded-xl w-full max-w-lg shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-luxury-gold/10">
                            <h2 className="text-xl font-serif text-luxury-gold uppercase tracking-widest">Add Video</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-luxury-nude/50 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">YouTube URL or Video ID</label>
                                <input required type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-[#111] border border-luxury-gold/20 py-2 px-3 text-white rounded focus:border-luxury-gold focus:outline-none" />
                                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                                <p className="text-luxury-nude/50 text-[10px] mt-2 italic">You can add a maximum of 3 videos.</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-luxury-gold/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-luxury-gold text-luxury-gold uppercase tracking-wider text-sm rounded hover:bg-white/5">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-luxury-gold text-black uppercase tracking-wider text-sm font-medium rounded hover:bg-luxury-lightGold">
                                    Add Video
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVideos;
