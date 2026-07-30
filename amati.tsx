import React, { useState, useEffect, useRef } from 'react';

// --- ICONS ---
const CustomSpinner = ({ className = "h-6 w-6 text-[#0891B3]" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const CheckCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-[13px] h-[13px]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const XCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-[13px] h-[13px]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
const TrashIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-[12px] h-[12px]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
const PlayIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>;
const DownloadIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-[12px] h-[12px]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const EyeIcon = ({ className }) => <svg className={className || "w-[12px] h-[12px]"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const UploadCloudIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
const ExternalLinkIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-[14px] h-[14px]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const CopyIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-[12px] h-[12px]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;

// --- WRAPPER TERPUSAT UNTUK PREVIEW ---
const wrapJsAsHtml = (jsCode, resolution = '1920x1080', duration = 10, viewMode = 'preview') => {
    const isThumb = viewMode === 'thumbnail';
    const isPreview = viewMode === 'preview';
    const [w, h] = resolution.split('x');

    const playerStyles = isPreview ? `
    .player-bar {
        height: 44px; background: #ffffff;
        border: 1px solid #0891B3; border-radius: 8px;
        padding: 0 16px; display: flex; align-items: center; gap: 12px;
        margin-top: 12px; flex-shrink: 0;
    }
    .play-btn {
        background: #0891B3; color: white; border: none; border-radius: 50%;
        width: 24px; height: 24px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        padding: 0; transition: background 0.2s;
    }
    .play-btn:hover { background: #06738F; }
    .play-btn svg { width: 10px; height: 10px; fill: currentColor; }
    .progress-track {
        flex: 1; height: 6px; background: #e2e8f0;
        border-radius: 4px; position: relative; cursor: pointer;
    }
    .progress-fill {
        height: 100%; background: #0891B3; width: 0%;
        pointer-events: none; border-radius: 4px; position: relative;
    }
    .progress-thumb {
        position: absolute; right: -6px; top: 50%; transform: translateY(-50%);
        width: 12px; height: 12px; background: #fff; border: 2px solid #0891B3;
        border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); pointer-events: none;
    }
    .time-label {
        font-size: 11px; font-weight: 700; color: #475569;
        font-variant-numeric: tabular-nums; min-width: 38px; text-align: right;
    }
    ` : '';

    const playerHtml = isPreview ? `
    <div class="player-bar">
        <button class="play-btn" id="btnPlayPause">
            <svg id="iconPause" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            <svg id="iconPlay" viewBox="0 0 24 24" style="display:none;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
        <div class="progress-track" id="track">
            <div class="progress-fill" id="fill">
                <div class="progress-thumb"></div>
            </div>
        </div>
        <div class="time-label" id="timeDisp">0.0s</div>
    </div>
    ` : '';

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    html, body {
        margin: 0; padding: 0; width: 100%; height: 100vh; overflow: hidden;
        background: transparent;
        display: flex; flex-direction: column;
        font-family: ui-sans-serif, system-ui, sans-serif;
    }
    .svg-wrapper {
        flex: 1; display: flex; align-items: center; justify-content: center;
        width: 100%; overflow: hidden;
        ${isPreview ? 'background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1;' : 'background: transparent;'}
    }
    svg {
        display: block; width: 100%; height: 100%;
    }
    ${playerStyles}
</style>
</head>
<body>
    <div class="svg-wrapper">
        <svg id="mainCanvas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"></svg>
    </div>
    ${playerHtml}

    <script>
        ${jsCode}

        const duration = ${duration};
        const width = ${w};
        const height = ${h};
        let isPlaying = ${isThumb ? 'false' : 'true'};
        let startTime = performance.now();
        let accumulatedTime = 0;
        
        const svg = document.getElementById('mainCanvas');
        const btn = document.getElementById('btnPlayPause');
        const iconPlay = document.getElementById('iconPlay');
        const iconPause = document.getElementById('iconPause');
        const fill = document.getElementById('fill');
        const timeDisp = document.getElementById('timeDisp');
        const track = document.getElementById('track');

        // Execute AI Code carefully
        try {
            if (typeof create === 'function') create(svg, width, height);
        } catch (err) { console.error("Create Error:", err); }
        
        let isDragging = false;
        
        const updateTimeFromEvent = (clientX) => {
            if(!track) return;
            const rect = track.getBoundingClientRect();
            const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
            const targetTime = (percent / 100) * duration;
            
            accumulatedTime = targetTime;
            
            try {
                if (typeof update === 'function') update(targetTime, svg, width, height);
            } catch (err) {}
            
            if(fill && timeDisp) {
                fill.style.width = percent + '%';
                timeDisp.innerText = targetTime.toFixed(1) + 's';
            }
        };

        if (track) {
            track.addEventListener('mousedown', (e) => {
                isDragging = true;
                updateTimeFromEvent(e.clientX);
            });
            window.addEventListener('mousemove', (e) => {
                if(isDragging) updateTimeFromEvent(e.clientX);
            });
            window.addEventListener('mouseup', () => {
                if(isDragging) {
                    isDragging = false;
                    startTime = performance.now();
                }
            });
        }

        const renderFrame = () => {
            if(!isPlaying) {
                requestAnimationFrame(renderFrame);
                return;
            }
            const now = performance.now();
            const elapsed = (now - startTime) / 1000;
            let current = (accumulatedTime + elapsed) % duration;
            
            try {
                if (typeof update === 'function') update(current, svg, width, height);
            } catch (err) {}
            
            if (fill && timeDisp && !isDragging) {
                fill.style.width = ((current / duration) * 100) + '%';
                timeDisp.innerText = current.toFixed(1) + 's';
            }
            requestAnimationFrame(renderFrame);
        };
        requestAnimationFrame(renderFrame);

        // First frame init for thumbnails
        if (typeof update === 'function' && !isPlaying) update(0, svg, width, height);

        if (btn && track) {
            btn.addEventListener('click', () => {
                if(isPlaying) {
                    isPlaying = false;
                    iconPause.style.display = 'none';
                    iconPlay.style.display = 'block';
                    accumulatedTime = (accumulatedTime + (performance.now() - startTime) / 1000) % duration;
                } else {
                    isPlaying = true;
                    iconPlay.style.display = 'none';
                    iconPause.style.display = 'block';
                    startTime = performance.now();
                }
            });
        }
    </script>
</body>
</html>`;
};

export default function App() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const renderMediaInputRef = useRef(null);
    const [uploadedRenderFiles, setUploadedRenderFiles] = useState([]);

    const [selectedFps, setSelectedFps] = useState(30);
    const [selectedBitrate, setSelectedBitrate] = useState(20);
    const [zipFilename, setZipFilename] = useState('');

    const [cards, setCards] = useState([]);
    const [isRendering, setIsRendering] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [clearAllConfirm, setClearAllConfirm] = useState(false);
    const [fileToDeleteConfirm, setFileToDeleteConfirm] = useState(null);
    const [clearAllFilesConfirm, setClearAllFilesConfirm] = useState(false);
    const [previewModal, setPreviewModal] = useState(null);

    const [renderQuantity, setRenderQuantity] = useState(1);

    const cardsRef = useRef([]);
    const isPausedRef = useRef(false);
    const isRenderingRef = useRef(false);

    useEffect(() => { cardsRef.current = cards; }, [cards]);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('id-ID', { hour12: false });
    const dateString = currentTime.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

    const countPending = cards.filter(f => f.status === 'pending').length;
    const countProcessing = cards.filter(f => f.status === 'processing').length;
    const countSuccess = cards.filter(f => f.status === 'done').length;
    const countFailed = cards.filter(f => f.status === 'failed').length;

    const canRender = (countPending > 0 || countFailed > 0) && !isRendering && !isPaused && countProcessing === 0;
    const canPauseResume = isRendering || countProcessing > 0 || isPaused;
    const isZipActive = countSuccess > 0;

    const inputClass = "w-full text-xs py-1.5 px-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-[#0891B3] focus:outline-none focus:border-[#0891B3] transition-all disabled:bg-gray-100 disabled:text-gray-400 h-[30px]";

    // --- UPLOAD TXT UNTUK RENDER ---
    const handleRenderUpload = async (e) => {
        let files = [];
        if (e.target.files && e.target.files.length > 0) files = Array.from(e.target.files);
        else if (e.dataTransfer && e.dataTransfer.files.length > 0) files = Array.from(e.dataTransfer.files);
        
        const txtFiles = files.filter(f => f.type === 'text/plain' || f.name.endsWith('.txt'));
        if (txtFiles.length === 0) return;

        const newFiles = await Promise.all(txtFiles.map(async (file) => {
            const content = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => resolve(event.target.result);
                reader.readAsText(file);
            });

            // Sistem Pintar Deteksi Resolusi dari kode (Mencari argumen viewBox)
            let width = 1920, height = 1080;
            const vbMatch = content.match(/viewBox[^\d]+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/i);
            if(vbMatch) {
                width = parseFloat(vbMatch[1]);
                height = parseFloat(vbMatch[2]);
            }

            // Sistem Pintar Deteksi Durasi (Mencari pola `time % 10` atau `duration = 10`)
            let dur = 10;
            const durMatches = content.match(/%\s*(\d+(?:\.\d+)?)/g);
            if(durMatches) {
                let maxDur = 0;
                durMatches.forEach(m => {
                    let val = parseFloat(m.replace('%', '').trim());
                    if(val > maxDur && val <= 60) maxDur = val; // Batas wajar durasi
                });
                if(maxDur > 0) dur = maxDur;
            }

            let ratioStr = '16:9';
            let aspect = width / height;
            if (aspect > 1.3) ratioStr = '16:9';
            else if (aspect < 0.75) ratioStr = '9:16';
            else ratioStr = '1:1';

            return { 
                id: Date.now() + Math.random().toString(36).substr(2, 5), 
                name: file.name, 
                content,
                resolution: `${width}x${height}`,
                ratio: ratioStr,
                duration: dur
            };
        }));

        setUploadedRenderFiles(prev => [...prev, ...newFiles]);
        if (e.target) e.target.value = '';
    };

    const handleDragOver = (e) => { e.preventDefault(); };
    const handleDropRender = (e) => { e.preventDefault(); handleRenderUpload(e); };

    // Push file uploadd ke deretan Kartu Antrean
    useEffect(() => {
        if (uploadedRenderFiles.length > 0) {
            let newTasks = [];
            const qty = parseInt(renderQuantity) || 1;
            uploadedRenderFiles.forEach(file => {
                for(let i=0; i<qty; i++) {
                    // Cek apakah sudah ada di cards (menghindari duplikasi saat re-render)
                    const exists = cardsRef.current.find(c => c.originId === file.id && c.iteration === i);
                    if (!exists) {
                        newTasks.push({
                            id: R().toString(36).substr(2, 9),
                            originId: file.id,
                            iteration: i,
                            title: `${file.name.replace('.txt', '')} ${qty > 1 ? `(${i+1})` : ''}`,
                            code: file.content,
                            status: 'pending',
                            error: null,
                            ratio: file.ratio,
                            resolution: file.resolution,
                            duration: file.duration,
                            totalFrames: file.duration * selectedFps,
                            framesRendered: 0,
                            mp4Blob: null
                        });
                    }
                }
            });
            if (newTasks.length > 0) {
                setCards(prev => [...newTasks, ...prev]);
            }
        }
    }, [uploadedRenderFiles, renderQuantity, selectedFps]);


    // --- MESIN RENDER FFMPEG (SIMULASI/KERANGKA) ---
    const startRender = async (isResume = false) => {
        if (isRenderingRef.current) return;
        
        isRenderingRef.current = true; setIsRendering(true); setIsPaused(false); isPausedRef.current = false;
        
        // Loop secara sequensial (satu per satu untuk video rendering agar RAM aman)
        for (let j = 0; j < cardsRef.current.length; j++) {
            if (isPausedRef.current) break;

            if (cardsRef.current[j].status === 'pending') {
                const task = cardsRef.current[j];
                const tFrames = task.duration * selectedFps;

                setCards(prev => prev.map(f => f.id === task.id ? { ...f, status: 'processing', totalFrames: tFrames, framesRendered: 0 } : f));
                
                try {
                    // === AREA EKSEKUSI FFMPEG ===
                    // Simulasi perhitungan frame-by-frame untuk UI Progress
                    for(let frame = 1; frame <= tFrames; frame++) {
                        if (isPausedRef.current) throw new Error("Paused");
                        
                        // DI SINI FUNGSI TANGKAP FRAME CANVAS DILAKUKAN
                        
                        // Memperbarui UI Card dengan progress frame
                        if (frame % 3 === 0 || frame === tFrames) {
                            setCards(prev => prev.map(f => f.id === task.id ? { ...f, framesRendered: frame } : f));
                        }
                        
                        await new Promise(r => setTimeout(r, 10)); // Delay simulasi rendering
                    }

                    // Pembuatan Dummy MP4 Blob (Tanda sukses)
                    const dummyVideoBlob = new Blob(["Simulasi MP4 Content"], { type: "video/mp4" });
                    const mp4Url = URL.createObjectURL(dummyVideoBlob);

                    setCards(prev => prev.map(f => f.id === task.id ? { ...f, status: 'done', mp4Blob: mp4Url } : f));

                } catch (error) {
                    if (error.message === "Paused") {
                        setCards(prev => prev.map(f => f.id === task.id ? { ...f, status: 'pending' } : f));
                    } else {
                        setCards(prev => prev.map(f => f.id === task.id ? { ...f, status: 'failed', error: error.message } : f));
                    }
                }
            }
        }
        
        if (!isPausedRef.current) { setIsRendering(false); isRenderingRef.current = false; }
    };

    const handlePauseResume = () => {
        if ((isRendering || countProcessing > 0) && !isPaused) { 
            setIsPaused(true); isPausedRef.current = true; 
            setIsRendering(false); isRenderingRef.current = false;
        } else if (isPaused || (!isRendering && countPending > 0)) {
            startRender(true); 
        }
    };

    const handleCopyText = (text) => {
        if (!text) return;
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const downloadSingleMP4 = (card) => {
        if(!card.mp4Blob) return;
        const link = document.createElement('a');
        link.href = card.mp4Blob; 
        link.download = `${card.title.replace(/\s+/g, '_')}.mp4`;
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link);
    };

    const handleDownloadZip = async () => {
        const doneCards = cards.filter(f => f.status === 'done' && f.mp4Blob);
        if (doneCards.length === 0) return;
        setIsZipping(true);
        try {
            const JSZip = (await import('https://esm.sh/jszip')).default;
            const zip = new JSZip();
            for (let i = 0; i < doneCards.length; i++) {
                const card = doneCards[i];
                // Mengambil blob dari URL simulasi (Di server asli pakai blob asli)
                const response = await fetch(card.mp4Blob);
                const blob = await response.blob();
                zip.file(`${card.title.replace(/\s+/g, '_')}.mp4`, blob);
            }
            const content = await zip.generateAsync({ type: 'blob' });
            const zipUrl = URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = zipUrl; link.download = `${zipFilename.trim() || 'AMATI-Motion'}.zip`;
            document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(zipUrl);
        } catch (err) { 
            setGlobalMessage({ title: "Error Sistem", type: "error", text: "Gagal mengemas file ZIP." });
        } finally { setIsZipping(false); }
    };

    const confirmClearAllAction = () => {
        setIsPaused(false); isPausedRef.current = false; setIsRendering(false); isRenderingRef.current = false;
        setCards([]); setUploadedRenderFiles([]); setClearAllConfirm(false); setCurrentPage(1); 
    };

    const totalPages = Math.ceil(cards.length / itemsPerPage);
    const paginatedCards = cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <style>{`
                body { font-family: 'Share Tech', sans-serif; overscroll-behavior: contain; margin: 0; padding: 0; background: #f1f5f9; }
                .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: #0891B3; }
            `}</style>
            
            <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-100 text-slate-900 flex flex-col">
                <header className="bg-[#0f172a] border-b border-slate-800 sticky top-0 z-30 shadow-md h-14 flex items-center shrink-0">
                    <div className="w-full px-4 sm:px-6 flex justify-between items-center">
                        <div className="text-[28px] leading-none font-bold text-[#0891B3] tracking-widest flex items-center gap-2">AMATI <span className="text-[12px] font-medium text-slate-400 mt-2 tracking-normal uppercase hidden sm:block border-l border-slate-600 pl-3 ml-1">MP4 Render Engine</span></div>
                        <div className="text-right flex flex-col justify-center items-end text-slate-100">
                            <div className="text-[16px] leading-none font-bold tracking-[0.1em]">{timeString}</div>
                            <div className="text-[11px] leading-tight text-slate-400 tracking-wider mt-0.5">{dateString}</div>
                        </div>
                    </div>
                </header>

                <main className="w-full flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative min-h-0 bg-slate-100">
                    
                    {/* PANEL KIRI (PENGATURAN) */}
                    <aside className="w-full lg:w-[380px] bg-slate-50 lg:border-r border-slate-200 flex flex-col z-20 shrink-0 lg:h-full lg:overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-y-visible lg:overflow-y-auto overflow-x-hidden custom-scroll">
                            <div className="p-4 flex flex-col gap-4">
                                
                                <div className="flex w-full">
                                    {/* TOMBOL EXTERNAL LINK PENGGANTI TAB */}
                                    <a href="[pake ini]" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between bg-[#0891B3] hover:bg-[#06738F] text-white font-bold py-3 px-4 rounded-lg transition shadow-md text-xs tracking-wide hover:-translate-y-0.5 duration-200 uppercase">
                                        <span>Akses Generate Motion (TXT)</span>
                                        <ExternalLinkIcon className="w-4 h-4 opacity-90" />
                                    </a>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm border border-[#0891B3]/30 flex flex-col text-left">
                                    <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-[#0891B3]/20">
                                        <h2 className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">Pengaturan Render</h2>
                                    </div>

                                    {/* DROPZONE KHUSUS FILE TXT */}
                                    <div className="mb-4 shrink-0 flex flex-col">
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="block text-[11px] font-bold text-slate-600">Daftar Kode JS Motion</label>
                                        </div>
                                        
                                        <input type="file" ref={renderMediaInputRef} multiple accept=".txt" onChange={handleRenderUpload} className="hidden" />
                                        
                                        <button onClick={() => renderMediaInputRef.current?.click()} disabled={isRendering && !isPaused} className="w-full h-10 mb-2 border-2 border-dashed border-[#0891B3]/30 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2 bg-[#0891B3]/5 text-[#0891B3] hover:bg-[#0891B3]/10 disabled:opacity-50 disabled:cursor-wait shadow-sm">
                                            <UploadCloudIcon className="w-4 h-4 opacity-80" /> 
                                            <span>Upload File .TXT</span>
                                        </button>
                                        
                                        <div 
                                            className={`border rounded flex flex-col bg-slate-50 transition-all overflow-hidden relative ${isRendering && !isPaused ? 'border-gray-200' : 'border-gray-300 focus-within:ring-2 focus-within:ring-[#0891B3] focus-within:border-[#0891B3]'}`}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDropRender}
                                        >
                                            <div className="w-full h-[150px] p-2 overflow-y-auto custom-scroll bg-white">
                                                {uploadedRenderFiles.length === 0 ? (
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-[10px] font-medium pointer-events-none uppercase tracking-widest text-center px-4">
                                                        Tarik file .TXT ke sini untuk dirender seketika
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-2">
                                                        {uploadedRenderFiles.map((file) => (
                                                            <div key={file.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded shadow-sm hover:border-[#0891B3]/40 transition-colors group">
                                                                <div className="flex flex-col min-w-0 flex-1 pr-2">
                                                                    <span className="text-[10px] font-bold text-slate-700 truncate">{file.name}</span>
                                                                    <div className="flex gap-1.5 text-[8px] text-slate-500 font-bold mt-1 uppercase tracking-wide">
                                                                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{file.ratio}</span>
                                                                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{file.resolution}</span>
                                                                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[#0891B3] normal-case">{file.duration}s</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1.5 shrink-0">
                                                                    <button 
                                                                        onClick={() => setPreviewModal({ code: file.content, resolution: file.resolution, duration: file.duration })} 
                                                                        disabled={isRendering && !isPaused} 
                                                                        className="p-1.5 bg-blue-50 text-blue-600 rounded-md border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                        title="Preview"
                                                                    >
                                                                        <EyeIcon className="w-3.5 h-3.5" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => setFileToDeleteConfirm(file.id)} 
                                                                        disabled={isRendering && !isPaused} 
                                                                        className="p-1.5 bg-red-50 text-red-600 rounded-md border border-red-200 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                        title="Hapus"
                                                                    >
                                                                        <TrashIcon className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-between items-center border-t border-gray-200 px-2 py-1.5 shrink-0 bg-white z-10">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Qty:</span>
                                                    <input type="number" min="1" max="100" value={renderQuantity} onChange={e => setRenderQuantity(e.target.value)} disabled={isRendering && !isPaused} className={`${inputClass} !h-[22px] !w-12 !px-1 !py-0 !text-center text-[10px] font-bold`} />
                                                    <span className="text-[10px] font-bold text-slate-400 tracking-widest ml-1 uppercase">TOTAL: {uploadedRenderFiles.length} x {renderQuantity || 1} = <span className="text-[#0891B3] ml-1">{uploadedRenderFiles.length * (parseInt(renderQuantity) || 1)}</span></span>
                                                </div>
                                                <button onClick={() => setClearAllFilesConfirm(true)} disabled={(isRendering && !isPaused) || uploadedRenderFiles.length === 0} className="flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-700 transition disabled:opacity-50"><TrashIcon className="w-3 h-3" /> CLEAR</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-slate-200/60 mt-1 mb-2.5 shrink-0"></div>

                                    {/* GLOBAL SETTINGS - KHUSUS VIDEO MP4 */}
                                    <div className="grid grid-cols-6 gap-2 shrink-0">
                                        <div className="col-span-3">
                                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Kualitas (Bitrate)</label>
                                            <select value={selectedBitrate} onChange={(e) => setSelectedBitrate(parseInt(e.target.value))} disabled={isRendering && !isPaused} className={`${inputClass} font-bold cursor-pointer disabled:opacity-60 px-1 bg-slate-50 border-slate-200 text-slate-700`}>
                                                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(r => <option key={r} value={r}>{r} Mbps</option>)}
                                            </select>
                                        </div>
                                        <div className="col-span-3">
                                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Framerate</label>
                                            <select value={selectedFps} onChange={(e) => setSelectedFps(parseInt(e.target.value))} disabled={isRendering && !isPaused} className={`${inputClass} font-bold cursor-pointer disabled:opacity-60 px-1`}>
                                                <option value={30}>30 FPS</option>
                                                <option value={60}>60 FPS</option>
                                            </select>
                                        </div>
                                        
                                        <div className="col-span-6 mt-1">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <FileTextIcon />
                                                <label className="block text-[10px] font-bold text-slate-600 leading-none">Nama Ekspor ZIP (.mp4)</label>
                                            </div>
                                            <input type="text" value={zipFilename} onChange={e => setZipFilename(e.target.value)} disabled={isRendering && !isPaused} placeholder="AMATI-Render" className={`${inputClass} placeholder:text-slate-400`} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* PANEL BAWAH (STATUS & TOMBOL UTAMA) */}
                        <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-4 z-10">
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm transition-all overflow-hidden">
                                <div className="grid grid-cols-3 gap-0 border-b border-gray-100 p-2 bg-gray-50">
                                    <div className="flex flex-col items-center justify-center border border-[#0891B3]/20 rounded-lg bg-[#0891B3]/5 py-1.5 shadow-sm transition-all">
                                        <div className="flex items-center gap-1 mb-1 text-[#0891B3]"><ClockIcon /> <span className="text-xs font-medium uppercase leading-none">Selected</span></div>
                                        <span className="text-xs font-black text-[#0891B3] tabular-nums">{isRendering || countPending > 0 ? (countPending + countProcessing) : computedTaskCount}</span>
                                    </div>
                                    <div className="mx-1.5 flex flex-col items-center justify-center border border-green-200 rounded-lg bg-green-50 py-1.5 shadow-sm transition-all">
                                        <div className="flex items-center gap-1 mb-1 text-green-600"><CheckCircleIcon /> <span className="text-xs font-medium uppercase leading-none">Completed</span></div>
                                        <span className="text-xs font-black text-green-700 tabular-nums">{countSuccess}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center border border-red-200 rounded-lg bg-red-50 py-1.5 shadow-sm transition-all">
                                        <div className="flex items-center gap-1 mb-1 text-red-600"><XCircleIcon className="w-3 h-3" /> <span className="text-xs font-medium uppercase leading-none">Failed</span></div>
                                        <span className="text-xs font-black text-red-700 tabular-nums">{countFailed}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-white flex items-center justify-between gap-3">
                                    <button onClick={() => setClearAllConfirm(true)} disabled={isRendering && !isPaused || cards.length === 0} className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold uppercase tracking-wide rounded border transition-colors ${cards.length > 0 && (!isRendering || isPaused) ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'}`}>
                                        <TrashIcon className="w-4 h-4" /> CLEAR ALL KARTU
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-1.5 h-10">
                                {isRendering || isPaused || countProcessing > 0 ? (
                                    <div className={`flex-1 border text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm select-none transition-all ${isPaused ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-[#0891B3]/10 text-[#0891B3] border-[#0891B3]/30'}`}>
                                        <SparklesIcon className={`w-4 h-4 ${isPaused ? '' : 'animate-spin'} ${isPaused ? 'text-amber-600' : 'text-[#0891B3]'}`} />
                                        <span className="uppercase tracking-wide">{isPaused ? 'Terhenti' : 'Merender MP4...'}</span>
                                    </div>
                                ) : (
                                    <button onClick={() => startRender(false)} disabled={!canRender} className={`flex-1 text-xs font-bold rounded-lg border shadow transition-colors flex items-center justify-center gap-2 uppercase tracking-wide truncate ${canRender ? 'bg-[#0891B3] hover:bg-[#06738F] text-white border-[#06738F] hover:-translate-y-0.5' : 'bg-slate-100 border-slate-200 cursor-not-allowed text-slate-400'}`}>
                                        <Wand2Icon /> Render MP4
                                    </button>
                                )}
                                <button onClick={handlePauseResume} disabled={!canPauseResume} className={`w-10 flex items-center justify-center rounded-lg border shadow-sm transition-all active:scale-95 shrink-0 ${!canPauseResume ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : isPaused ? 'bg-green-600 border-green-700 text-white hover:bg-green-700 hover:-translate-y-0.5' : 'bg-amber-100 border-amber-300 text-amber-600 hover:bg-amber-200 hover:-translate-y-0.5'}`}>
                                    {isPaused ? <PlayIcon /> : <PauseIcon />}
                                </button>
                                <button onClick={handleDownloadZip} disabled={!isZipActive || isZipping} className={`flex-1 text-xs font-bold rounded-lg border shadow transition-colors flex items-center justify-center gap-2 uppercase tracking-wide truncate ${isZipActive ? 'bg-green-600 hover:bg-green-700 text-white border-green-700 hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-80'}`}>
                                    {isZipping ? <CustomSpinner className="w-4 h-4 text-white" /> : <DownloadIcon className="w-4 h-4" />}
                                    <span className="truncate">Ekspor ZIP (.mp4)</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* KANAN (DAFTAR KARTU RENDER) */}
                    <section className="flex-1 flex flex-col lg:overflow-hidden relative min-h-0 bg-slate-100">
                        <div className="bg-white border-b border-slate-200 p-3 flex justify-between items-center shrink-0 shadow-sm z-10">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                {[50, 100, 500, 1000].map(num => (
                                    <button key={num} onClick={() => { setItemsPerPage(num); setCurrentPage(1); }} className={`px-2 py-1 rounded border transition ${itemsPerPage === num ? 'bg-[#0891B3]/10 text-[#0891B3] border-[#0891B3]/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'}`}>
                                        {num}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-500">Hal {currentPage} / {totalPages || 1}</span>
                                <div className="flex gap-1">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-50 border border-slate-200 transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
                                    <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-50 border border-slate-200 transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-4 lg:overflow-y-auto custom-scroll pb-20 lg:pb-4">
                            {cards.length > 0 ? (
                                <div className="grid gap-4 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                                    {paginatedCards.map(f => {
                                        return (
                                        <div key={f.id} className={`bg-white hover:shadow-md rounded-lg shadow-sm border flex flex-col transition-all duration-300 overflow-hidden ${f.status === 'processing' ? 'border-[#0891B3] ring-2 ring-[#0891B3]/20' : f.status === 'failed' ? 'border-red-300' : 'border-slate-200'}`}>
                                            
                                            {/* HEADER KARTU */}
                                            <div className="p-2.5 border-b border-slate-100 flex justify-between items-center gap-2 shrink-0 bg-slate-50">
                                                <p className="text-[12px] font-bold text-slate-800 truncate" title={f.title}>{f.title}</p>
                                                <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded border whitespace-nowrap ${f.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : f.status === 'processing' ? 'bg-[#0891B3]/10 text-[#0891B3] border-[#0891B3]/20' : f.status === 'failed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-slate-600 border-slate-200'}`}>
                                                    {f.status.toUpperCase()}
                                                </span>
                                            </div>

                                            {/* KONTEN KARTU BERUBAH SECARA DINAMIS BERDASARKAN STATUS */}
                                            {f.status === 'processing' ? (
                                                <div className="p-6 flex flex-col items-center justify-center bg-white h-[180px] gap-3">
                                                    <CustomSpinner className="w-10 h-10 text-[#0891B3]" />
                                                    <div className="flex flex-col items-center text-center">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mengekstrak Frame</span>
                                                        <div className="text-3xl font-black text-slate-800 tabular-nums leading-none">
                                                            {f.framesRendered} <span className="text-lg text-slate-300">/ {f.totalFrames}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="p-3 bg-white h-[136px] relative flex items-center justify-center group border-b border-slate-100">
                                                        <div className="w-full h-full bg-slate-50 rounded-lg border border-slate-200 overflow-hidden relative cursor-pointer" onClick={() => f.status === 'done' && setPreviewModal(f)}>
                                                            {f.status === 'done' ? (
                                                                <>
                                                                    <iframe title={`Thumb-${f.id}`} srcDoc={wrapJsAsHtml(f.code, f.resolution, f.duration, 'thumbnail')} sandbox="allow-scripts" className="absolute inset-0 w-full h-full border-none pointer-events-none" scrolling="no" />
                                                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                                                                        <PlayIcon className="text-white w-8 h-8 drop-shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                                                    </div>
                                                                </>
                                                            ) : f.status === 'failed' ? (
                                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 bg-red-50"><AlertTriangleIcon className="w-6 h-6 mb-1" /><span className="text-[9px] font-bold">RENDER GAGAL</span></div>
                                                            ) : (
                                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400"><CodeIcon className="w-6 h-6 mb-1 opacity-50" /><span className="text-[9px] font-bold uppercase tracking-widest">Siap Render</span></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* TOMBOL KARTU */}
                                                    <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50">
                                                        <button onClick={() => setPreviewModal(f)} disabled={f.status === 'failed'} className="flex items-center justify-center gap-1.5 py-1.5 rounded border bg-white border-[#0891B3]/30 text-[#0891B3] hover:bg-[#0891B3]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
                                                            <EyeIcon /> <span className="text-[10px] font-bold uppercase tracking-widest">Preview</span>
                                                        </button>
                                                        
                                                        {f.status === 'done' ? (
                                                            <button onClick={() => downloadSingleMP4(f)} className="flex items-center justify-center gap-1.5 py-1.5 rounded border border-green-600 bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm">
                                                                <DownloadIcon className="w-3.5 h-3.5" /> <span className="text-[10px] font-bold uppercase tracking-widest">MP4</span>
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => setFileToDelete(f.id)} className="flex items-center justify-center gap-1.5 py-1.5 rounded border bg-white border-red-200 text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                                                                <TrashIcon className="w-3.5 h-3.5" /> <span className="text-[10px] font-bold uppercase tracking-widest">Hapus</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )})}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center w-full h-full min-h-[50vh]">
                                    <div className="w-20 h-20 bg-[#0891B3]/5 border border-[#0891B3]/20 text-[#0891B3]/60 rounded-full flex items-center justify-center mb-4">
                                        <Wand2Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Antrean Render</h3>
                                    <p className="text-slate-500 text-sm max-w-md">Silakan upload kumpulan file kode <b>.TXT</b> di panel kiri untuk memulai proses konversi ke MP4.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {previewModal && (() => {
                    const resStr = previewModal.resolution || '1920x1080';
                    const [resW, resH] = resStr.split('x').map(Number);
                    const aspect = resW / resH;

                    return (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 md:p-8 backdrop-blur-sm transition-opacity" onClick={() => setPreviewModal(null)}>
                            <div 
                                className="relative bg-white shadow-2xl flex flex-col rounded-xl p-3 w-full mx-auto" 
                                style={{ 
                                    maxWidth: `calc((85vh - 80px) * ${aspect})`
                                }} 
                                onClick={e => e.stopPropagation()}
                            >
                                <button className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-xl hover:bg-red-600 hover:scale-110 transition-transform z-[110]" onClick={() => setPreviewModal(null)}>
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                                
                                <div className="w-full" style={{ paddingBottom: `calc(${1 / aspect * 100}% + 56px)`, position: 'relative' }}>
                                    <iframe 
                                        srcDoc={wrapJsAsHtml(previewModal.code, resStr, previewModal.duration, 'preview')} 
                                        className="absolute inset-0 w-full h-full border-none block" 
                                        sandbox="allow-scripts" 
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* MODAL KONFIRMASI PENGHAPUSAN */}
                {fileToDelete && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col items-center text-center">
                            <div className="bg-red-100 p-3 rounded-full mb-3"><AlertTriangleIcon /></div>
                            <h3 className="text-lg font-bold text-slate-800">Hapus Kartu?</h3>
                            <p className="text-sm text-slate-600 mt-2 mb-6">Kartu render ini akan dihapus dari antrean.</p>
                            <div className="flex w-full gap-3">
                                <button onClick={() => setFileToDelete(null)} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded hover:bg-slate-300 transition text-xs shadow-sm">Batal</button>
                                <button onClick={() => {
                                    setCards(prev => prev.filter(f => f.id !== fileToDelete)); 
                                    setFileToDelete(null);
                                }} className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition shadow-sm text-xs">Ya, Hapus</button>
                            </div>
                        </div>
                    </div>
                )}

                {clearAllConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col items-center text-center">
                            <div className="bg-red-100 p-3 rounded-full mb-3"><AlertTriangleIcon /></div>
                            <h3 className="text-lg font-bold text-slate-800">Hapus Semua?</h3>
                            <p className="text-sm text-slate-600 mt-2 mb-6">Anda akan menghapus <b>seluruh antrean</b> secara permanen.</p>
                            <div className="flex w-full gap-3">
                                <button onClick={() => setClearAllConfirm(false)} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded hover:bg-slate-300 transition text-xs shadow-sm">Batal</button>
                                <button onClick={confirmClearAllAction} className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition shadow-sm text-xs">Ya, Hapus Semua</button>
                            </div>
                        </div>
                    </div>
                )}

                {fileToDeleteConfirm && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col items-center text-center">
                            <div className="bg-red-100 p-3 rounded-full mb-3"><AlertTriangleIcon /></div>
                            <h3 className="text-lg font-bold text-slate-800">Hapus File?</h3>
                            <p className="text-sm text-slate-600 mt-2 mb-6">Anda yakin ingin menghapus referensi file ini dari antrean upload?</p>
                            <div className="flex w-full gap-3">
                                <button onClick={() => setFileToDeleteConfirm(null)} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded hover:bg-slate-300 transition text-xs shadow-sm">Batal</button>
                                <button onClick={() => {
                                    setUploadedRenderFiles(prev => prev.filter(f => f.id !== fileToDeleteConfirm));
                                    // Also remove from cards if it's there
                                    setCards(prev => prev.filter(c => c.originId !== fileToDeleteConfirm));
                                    setFileToDeleteConfirm(null);
                                }} className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition shadow-sm text-xs">Ya, Hapus</button>
                            </div>
                        </div>
                    </div>
                )}

                {clearAllFilesConfirm && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col items-center text-center">
                            <div className="bg-red-100 p-3 rounded-full mb-3"><AlertTriangleIcon /></div>
                            <h3 className="text-lg font-bold text-slate-800">Kosongkan Wadah?</h3>
                            <p className="text-sm text-slate-600 mt-2 mb-6">Seluruh file TXT di dalam kotak upload akan dihapus.</p>
                            <div className="flex w-full gap-3">
                                <button onClick={() => setClearAllFilesConfirm(false)} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded hover:bg-slate-300 transition text-xs shadow-sm">Batal</button>
                                <button onClick={() => {
                                    setUploadedRenderFiles([]);
                                    setClearAllFilesConfirm(false);
                                }} className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition shadow-sm text-xs">Ya, Kosongkan</button>
                            </div>
                        </div>
                    </div>
                )}

                {globalMessage && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col items-center text-center">
                            <div className={`p-3 rounded-full mb-3 ${globalMessage.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                <AlertTriangleIcon />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">{globalMessage.title}</h3>
                            <p className="text-sm text-slate-600 mt-2 mb-6">{globalMessage.text}</p>
                            <button onClick={() => setGlobalMessage(null)} className="w-full bg-[#0891B3] text-white font-bold py-2 rounded-lg hover:bg-[#06738F] transition shadow-sm">Tutup</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
