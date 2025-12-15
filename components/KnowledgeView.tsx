import React, { useState, useRef } from 'react';
import { 
  Database, BookOpen, MessageSquare, FileText, Plus, Folder, FolderPlus,
  Upload, Clock, UserCheck, MessageCircle, Heart, Search, Eye, X, CloudLightning, Loader2, ChevronRight, Home, Check
} from 'lucide-react';
import { AudienceData, TagCategory, FileItem } from '../types';
import { Badge } from './UIComponents';
import { BRAND_KB_FILES, PRODUCT_KB_FILES, CONSUMER_PREFERENCES, MOCK_SERVICE_HISTORY, MOCK_CHAT_HISTORY } from '../constants';

// Extended type for local state handling
interface ExtendedFileItem extends FileItem {
  url?: string;
  isNew?: boolean;
  parentId?: string | null; // Support nesting
}

// --- Component: File Preview Modal ---
const FilePreviewModal = ({ file, onClose }: { file: ExtendedFileItem | null, onClose: () => void }) => {
  if (!file) return null;

  const isImage = file.type === 'img' || file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPdf = file.type === 'pdf' || file.name.match(/\.pdf$/i);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[85vh] bg-[#151B2B] border border-eureka-border rounded-xl flex flex-col relative shadow-2xl">
        <div className="h-14 border-b border-eureka-border flex items-center justify-between px-6 bg-eureka-panel">
           <div className="flex items-center gap-3">
             <FileText className="text-eureka-primary" size={20} />
             <div>
               <h3 className="text-sm font-bold text-white">{file.name}</h3>
               <p className="text-[10px] text-slate-400">{file.date} • {file.size}</p>
             </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
             <X size={20} />
           </button>
        </div>
        
        <div className="flex-1 bg-[#0B0F19] p-4 flex items-center justify-center overflow-auto relative">
           {file.url ? (
             isImage ? (
               <img src={file.url} alt="preview" className="max-w-full max-h-full object-contain rounded shadow-lg" />
             ) : isPdf ? (
               <iframe src={file.url} className="w-full h-full rounded border border-white/10" title="PDF Preview"></iframe>
             ) : (
               <div className="text-center">
                 <FileText size={64} className="mx-auto text-slate-600 mb-4" />
                 <p className="text-slate-400">该文件类型暂不支持在线预览 (No Preview Available)</p>
                 <a href={file.url} download className="mt-4 inline-block px-4 py-2 bg-eureka-primary text-white rounded text-xs font-bold">下载文件</a>
               </div>
             )
           ) : (
             <div className="text-center">
                <div className="w-24 h-24 bg-slate-800/50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-700 border-dashed">
                  <FileText size={48} className="text-slate-500" />
                </div>
                <p className="text-slate-300 font-bold mb-2">模拟文件预览 (Mock Preview)</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  这是一个系统预置的演示文件，暂无实际内容。请尝试上传真实文件以体验完整预览功能。
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Sub Component: Knowledge Base ---
const KnowledgeBasePanel = () => {
  const [activeTab, setActiveTab] = useState<'brand' | 'product'>('brand');
  
  // File State
  const [brandFiles, setBrandFiles] = useState<ExtendedFileItem[]>(BRAND_KB_FILES);
  const [productFiles, setProductFiles] = useState<ExtendedFileItem[]>(PRODUCT_KB_FILES);
  
  // Navigation State
  const [currentPath, setCurrentPath] = useState<{id: string, name: string}[]>([]);
  const [previewFile, setPreviewFile] = useState<ExtendedFileItem | null>(null);
  
  // Creation State
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("新建文件夹");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived State
  // Determine which list and setter to use based on the active tab
  const files = activeTab === 'brand' ? brandFiles : productFiles;
  
  const currentFolderId = currentPath.length > 0 ? currentPath[currentPath.length - 1].id : null;

  // Filter files for current view
  const currentViewFiles = files.filter(f => {
    if (currentFolderId === null) {
      return !f.parentId; // Show root files (parentId is undefined or null)
    }
    return f.parentId === currentFolderId;
  });

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: ExtendedFileItem = {
        id: `local_${Date.now()}`,
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'img' : 'docx',
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        date: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file),
        isNew: true,
        parentId: currentFolderId // Assign to current folder
      };
      
      // Explicitly update the correct state
      if (activeTab === 'brand') {
        setBrandFiles(prev => [newFile, ...prev]);
      } else {
        setProductFiles(prev => [newFile, ...prev]);
      }
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreateFolderClick = () => {
    setIsCreatingFolder(true);
    setNewFolderName("新建文件夹");
  };

  const confirmCreateFolder = () => {
    if (newFolderName && newFolderName.trim()) {
      const newFolder: ExtendedFileItem = {
        id: `folder_${Date.now()}`,
        name: newFolderName.trim(),
        type: 'folder',
        size: '-',
        date: new Date().toISOString().split('T')[0],
        isNew: true,
        parentId: currentFolderId // Assign to current folder
      };
      
      // Explicitly update the correct state
      if (activeTab === 'brand') {
        setBrandFiles(prev => [newFolder, ...prev]);
      } else {
        setProductFiles(prev => [newFolder, ...prev]);
      }
    }
    setIsCreatingFolder(false);
  };

  const handleItemClick = (file: ExtendedFileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(prev => [...prev, { id: file.id, name: file.name }]);
    } else {
      setPreviewFile(file);
    }
  };

  const handleNavigateUp = (index: number) => {
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath(prev => prev.slice(0, index + 1));
    }
  };

  // Reset path when switching tabs
  const handleSwitchTab = (tab: 'brand' | 'product') => {
    setActiveTab(tab);
    setCurrentPath([]);
    setIsCreatingFolder(false);
  };

  return (
    <div className="flex h-full">
      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {/* Sidebar */}
      <div className="w-56 border-r border-eureka-border bg-[#0F1623]/30 p-4 flex flex-col gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-2">知识库分类</h3>
        <button 
          onClick={() => handleSwitchTab('brand')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'brand' ? 'bg-eureka-primary text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
        >
          <BookOpen size={16} /> 品牌知识库 (Brand)
        </button>
        <button 
          onClick={() => handleSwitchTab('product')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'product' ? 'bg-eureka-primary text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
        >
          <Database size={16} /> 产品知识库 (Product)
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-center mb-4">
             <div>
               <h2 className="text-xl font-light text-white">{activeTab === 'brand' ? '品牌资产文件 (Assets)' : '产品资料库 (Product Info)'}</h2>
               <p className="text-xs text-slate-500 mt-1">支持多层级文件夹管理与文档预览</p>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={handleCreateFolderClick}
                  className="flex items-center gap-2 px-3 py-2 bg-[#151B2B] border border-eureka-border text-slate-300 rounded-lg text-xs font-bold hover:text-white hover:border-slate-500 transition-all"
                >
                  <FolderPlus size={14} /> 新建文件夹
                </button>
                <button 
                  onClick={handleUploadClick}
                  className="flex items-center gap-2 px-4 py-2 bg-tech-gradient text-white rounded-lg text-xs font-bold hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
                >
                  <Upload size={14} /> 上传文档
                </button>
             </div>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-4 bg-[#0B0F19] p-2 rounded border border-white/5">
             <button onClick={() => handleNavigateUp(-1)} className="hover:text-white flex items-center gap-1">
               <Home size={12} /> 根目录
             </button>
             {currentPath.map((folder, idx) => (
               <React.Fragment key={folder.id}>
                 <ChevronRight size={12} className="text-slate-700" />
                 <button 
                   onClick={() => handleNavigateUp(idx)}
                   className={`hover:text-white ${idx === currentPath.length - 1 ? 'font-bold text-white' : ''}`}
                 >
                   {folder.name}
                 </button>
               </React.Fragment>
             ))}
          </div>
        </div>

        {/* Folder/File Grid */}
        <div className="flex-1 overflow-y-auto p-6 pt-0 custom-scrollbar">
          {currentViewFiles.length === 0 && !isCreatingFolder ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
              <Folder size={48} className="mb-4 opacity-50" />
              <p className="text-sm">此文件夹为空 (Empty Folder)</p>
              <div className="flex gap-3 mt-4">
                 <button onClick={handleCreateFolderClick} className="text-xs text-eureka-primary hover:underline flex items-center gap-1"><FolderPlus size={12}/> 新建子文件夹</button>
                 <button onClick={handleUploadClick} className="text-xs text-eureka-primary hover:underline flex items-center gap-1"><Upload size={12}/> 上传文件</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-300">
              {/* Temporary Folder Creation Card */}
              {isCreatingFolder && (
                 <div className="bg-eureka-panel border border-eureka-primary rounded-xl p-4 flex flex-col items-center justify-center gap-3 h-40 relative shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                       <Folder size={24} fill="currentColor" />
                    </div>
                    <div className="w-full px-2">
                       <input 
                         autoFocus
                         className="w-full text-center text-xs bg-[#0B0F19] border border-eureka-border rounded py-1 text-white focus:border-eureka-primary outline-none"
                         value={newFolderName}
                         onChange={e => setNewFolderName(e.target.value)}
                         onKeyDown={e => {
                           if(e.key === 'Enter') confirmCreateFolder();
                           if(e.key === 'Escape') setIsCreatingFolder(false);
                         }}
                         placeholder="Folder Name"
                       />
                    </div>
                    <div className="flex gap-2 mt-1">
                       <button onClick={confirmCreateFolder} className="p-1.5 bg-eureka-primary text-white rounded hover:bg-eureka-primary/80"><Check size={12} /></button>
                       <button onClick={() => setIsCreatingFolder(false)} className="p-1.5 bg-slate-700 text-slate-300 rounded hover:bg-slate-600"><X size={12} /></button>
                    </div>
                 </div>
              )}

              {currentViewFiles.map(file => (
                <div 
                  key={file.id} 
                  onClick={() => handleItemClick(file)}
                  className={`bg-eureka-panel border rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all h-40 relative overflow-hidden ${file.isNew ? 'border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-eureka-border hover:border-eureka-primary/50'}`}
                >
                    {file.isNew && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
                    
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${file.type === 'folder' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-700/30 text-slate-300'}`}>
                      {file.type === 'folder' ? <Folder size={24} fill="currentColor" className="opacity-80" /> : <FileText size={24} />}
                    </div>
                    <div className="text-center w-full px-2">
                      <p className="text-xs font-bold text-slate-200 group-hover:text-white truncate w-full" title={file.name}>{file.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{file.type === 'folder' ? '文件夹' : file.size}</p>
                    </div>
                    
                    {file.type !== 'folder' && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                        <span className="flex items-center gap-1 text-xs font-bold text-white bg-black/50 px-3 py-1 rounded-full border border-white/20">
                          <Eye size={12} /> 预览
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Sub Component: Audience Library ---
const AudienceLibraryPanel = ({ 
  audienceData, setAudienceData 
}: { 
  audienceData: AudienceData, setAudienceData: React.Dispatch<React.SetStateAction<AudienceData>>
}) => {
  const [activeTab, setActiveTab] = useState<'tags' | 'pref' | 'service' | 'chat'>('tags');
  const [importing, setImporting] = useState(false);
  
  // Tag Editing State
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [tempTagValue, setTempTagValue] = useState("");

  const confirmAddTag = (categoryId: string, isCrm: boolean) => {
    if (tempTagValue && tempTagValue.trim()) {
      setAudienceData(prev => {
        // 1. Determine which key to update (crm or wecom)
        const listKey = isCrm ? 'crm' : 'wecom';
        
        // 2. Create a new list by mapping over the previous one (IMMUTABLE UPDATE)
        const newList = prev[listKey].map(cat => {
          if (cat.id === categoryId) {
            return { 
              ...cat, 
              tags: [...cat.tags, tempTagValue.trim()] 
            };
          }
          return cat;
        });

        // 3. Return the new state object
        return {
          ...prev,
          [listKey]: newList
        };
      });
      setTempTagValue("");
    }
    setEditingCategoryId(null);
  };

  const handleCRMImport = () => {
    setImporting(true);
    // Simulate API Call
    setTimeout(() => {
      setAudienceData(prev => ({
        ...prev,
        crm: [
          ...prev.crm,
          { id: `crm_import_${Date.now()}`, name: 'AI 智能预测', tags: ['高潜流失', '复购推荐 A', '复购推荐 B'] }
        ]
      }));
      setImporting(false);
      alert("成功同步 CRM 最新标签数据！");
    }, 1500);
  };

  // Helper renderers
  const renderTagGroups = (groups: TagCategory[], isCrmGroup: boolean = true, allowAdd = true) => (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
      {groups.map(cat => (
        <div key={cat.id} className="bg-eureka-panel border border-eureka-border rounded-lg p-5 hover:border-eureka-primary/30 transition-colors">
          <div className="flex justify-between mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-accent"></span>
              {cat.name}
            </h4>
            <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">{cat.tags.length} active</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.tags.map(tag => <Badge key={tag} color="primary" className="bg-[#0B0F19]">{tag}</Badge>)}
            {allowAdd && (
              editingCategoryId === cat.id ? (
                <div className="flex items-center gap-1 h-7 animate-in fade-in zoom-in duration-200">
                  <input 
                    autoFocus
                    className="w-24 px-2 py-1 text-[11px] bg-[#0B0F19] border border-eureka-primary rounded-md text-white outline-none focus:ring-1 focus:ring-eureka-primary"
                    value={tempTagValue}
                    onChange={e => setTempTagValue(e.target.value)}
                    onKeyDown={e => {
                      if(e.key === 'Enter') confirmAddTag(cat.id, isCrmGroup);
                      if(e.key === 'Escape') { setEditingCategoryId(null); setTempTagValue(""); }
                    }}
                    placeholder="Enter tag..."
                  />
                  <button onClick={() => confirmAddTag(cat.id, isCrmGroup)} className="p-1 bg-indigo-500/20 text-indigo-300 rounded hover:bg-indigo-500 hover:text-white"><Check size={12}/></button>
                  <button onClick={() => { setEditingCategoryId(null); setTempTagValue(""); }} className="p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded"><X size={12}/></button>
                </div>
              ) : (
                <button 
                  onClick={() => { setEditingCategoryId(cat.id); setTempTagValue(""); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer select-none bg-indigo-500/10 text-indigo-300 border-dashed border-indigo-500/30 hover:border-indigo-400 hover:text-white hover:bg-indigo-500/20 h-7"
                >
                  <Plus size={10} className="mr-1"/> 添加标签
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-56 border-r border-eureka-border bg-[#0F1623]/30 p-4 flex flex-col gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-2">人群库导航</h3>
        <button onClick={() => setActiveTab('tags')} className={`nav-btn ${activeTab === 'tags' ? 'active' : ''}`}>
           <UserCheck size={16} /> 消费者标签体系
        </button>
        <button onClick={() => setActiveTab('pref')} className={`nav-btn ${activeTab === 'pref' ? 'active' : ''}`}>
           <Heart size={16} /> 偏好设置
        </button>
        <button onClick={() => setActiveTab('service')} className={`nav-btn ${activeTab === 'service' ? 'active' : ''}`}>
           <Clock size={16} /> 服务记录
        </button>
        <button onClick={() => setActiveTab('chat')} className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`}>
           <MessageCircle size={16} /> 对话历史
        </button>
        
        <style>{`
          .nav-btn { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; transition: all 0.2s; color: #94A3B8; }
          .nav-btn:hover { background: rgba(255,255,255,0.05); color: #E2E8F0; }
          .nav-btn.active { background: #6366F1; color: white; }
        `}</style>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {activeTab === 'tags' && (
           <>
             <div className="flex justify-between items-end mb-6">
                <div>
                   <h2 className="text-xl font-light text-white mb-1">消费者标签体系 (Tag System)</h2>
                   <p className="text-xs text-slate-500">集成 CRM 与 企微生态的全域画像数据，支持实时添加</p>
                </div>
                <button 
                  onClick={handleCRMImport}
                  disabled={importing}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/50 text-indigo-300 rounded-lg text-xs font-bold hover:bg-indigo-600/30 transition-all disabled:opacity-50"
                >
                  {importing ? <Loader2 size={14} className="animate-spin"/> : <CloudLightning size={14} />}
                  {importing ? "正在同步..." : "同步第三方 CRM 数据"}
                </button>
             </div>
             
             <div className="mb-8">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Database size={12} /> CRM 核心标签
               </h3>
               {renderTagGroups(audienceData.crm, true)}
             </div>

             <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <MessageSquare size={12} /> 企微 / 社交标签
               </h3>
               {renderTagGroups(audienceData.wecom, false)}
             </div>
           </>
        )}
        
        {activeTab === 'pref' && (
           <>
             <h2 className="text-xl font-light text-white mb-6">消费者偏好设置 (Preferences)</h2>
             {renderTagGroups(CONSUMER_PREFERENCES, false, false)}
           </>
        )}
        
        {activeTab === 'service' && (
           <>
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-light text-white">服务记录 (Service History)</h2>
               <div className="relative">
                 <input className="bg-[#0F1623] border border-eureka-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-white w-64" placeholder="搜索客户姓名..." />
                 <Search size={12} className="absolute left-2.5 top-2.5 text-slate-500" />
               </div>
             </div>
             <div className="bg-eureka-panel border border-eureka-border rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                   <thead className="bg-[#0B0F19] text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">客户姓名</th>
                        <th className="px-6 py-4">日期</th>
                        <th className="px-6 py-4">类型</th>
                        <th className="px-6 py-4">摘要</th>
                        <th className="px-6 py-4">状态</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {MOCK_SERVICE_HISTORY.map(rec => (
                        <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                           <td className="px-6 py-4 font-bold text-white">{rec.customerName}</td>
                           <td className="px-6 py-4 font-mono text-slate-400">{rec.date}</td>
                           <td className="px-6 py-4">{rec.type}</td>
                           <td className="px-6 py-4 text-slate-400">{rec.summary}</td>
                           <td className="px-6 py-4">
                             <span className={`px-2 py-0.5 rounded text-[10px] ${rec.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                {rec.status}
                             </span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </>
        )}
        
        {activeTab === 'chat' && (
           <>
             <h2 className="text-xl font-light text-white mb-6">对话历史 (Chat History)</h2>
             <div className="space-y-3">
                {MOCK_CHAT_HISTORY.map(chat => (
                  <div key={chat.id} className="bg-eureka-panel border border-eureka-border rounded-lg p-4 hover:border-eureka-primary/40 transition-all cursor-pointer">
                     <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                              {chat.customerName.charAt(0)}
                           </div>
                           <span className="text-sm font-bold text-white">{chat.customerName}</span>
                           <span className={`text-[10px] px-1.5 rounded ${chat.channel === 'WeCom' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>{chat.channel}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{chat.date}</span>
                     </div>
                     <p className="text-xs text-slate-300 line-clamp-2 pl-8 relative">
                        <MessageSquare size={12} className="absolute left-1 top-0.5 text-slate-600" />
                        <span className="text-indigo-300 mr-2">[{chat.topic}]</span>
                        {chat.snippet}
                     </p>
                  </div>
                ))}
             </div>
           </>
        )}
      </div>
    </div>
  );
};

// --- Main View ---
export const KnowledgeView = ({ 
  audienceData, setAudienceData 
}: { 
  audienceData: AudienceData, setAudienceData: React.Dispatch<React.SetStateAction<AudienceData>>
}) => {
  const [activeSection, setActiveSection] = useState<'base' | 'audience'>('base');

  return (
    <div className="flex flex-col h-full bg-eureka-dark">
      {/* Top Toggle Switch */}
      <div className="h-14 border-b border-eureka-border bg-[#0B0F19] px-6 flex items-center shrink-0">
        <div className="flex bg-[#0F1623] border border-eureka-border rounded-lg p-1">
          <button 
            onClick={() => setActiveSection('base')}
            className={`px-5 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeSection === 'base' ? 'bg-eureka-panel text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Database size={14} /> 知识库 (Knowledge Base)
          </button>
          <button 
            onClick={() => setActiveSection('audience')}
            className={`px-5 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeSection === 'audience' ? 'bg-eureka-panel text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <UserCheck size={14} /> 人群库 (Audience Library)
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeSection === 'base' ? (
          <KnowledgeBasePanel />
        ) : (
          <AudienceLibraryPanel audienceData={audienceData} setAudienceData={setAudienceData} />
        )}
      </div>
    </div>
  );
};