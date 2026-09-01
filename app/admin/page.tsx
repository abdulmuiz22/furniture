"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  Upload,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  Layers,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  Lock,
  Eye,
  Cloud,
  Check,
  X,
  Search,
  Video,
  Image as ImageIcon,
  Film,
  Play,
  Maximize2,
  Filter,
  CheckSquare,
} from "lucide-react";
import { Product, MediaAsset, MediaSection } from "@/data/furnitureData";

interface InquiryData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  productName?: string;
  productId?: string;
  message: string;
  status: "new" | "contacted" | "completed";
  createdAt: string;
}

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return Boolean(sessionStorage.getItem("sassy_admin_token"));
    }
    return false;
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Tabs: 'products' | 'media' | 'add' | 'inquiries' | 'settings'
  const [activeTab, setActiveTab] = useState<
    "products" | "media" | "add" | "inquiries" | "settings"
  >("products");

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Products filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Media filtering
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [mediaSectionFilter, setMediaSectionFilter] = useState<string>("All");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>("All");

  // Add/Edit Product Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Living Room",
    description: "",
    dimensions: "",
    material: "",
    featured: true,
    inStock: true,
    mediaType: "image" as "image" | "video",
    video: "",
  });

  // Product Image & Video Upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadedPublicId, setUploadedPublicId] = useState<string>("");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("");
  const [uploadedVideoPublicId, setUploadedVideoPublicId] = useState<string>("");

  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState("");

  // Media Asset Management Modal (Create / Edit)
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaAsset | null>(null);
  const [mediaFormData, setMediaFormData] = useState<{
    title: string;
    section: MediaSection;
    mediaType: "image" | "video";
    url: string;
    caption: string;
    linkUrl: string;
    categoryRef: string;
  }>({
    title: "",
    section: "general",
    mediaType: "image",
    url: "",
    caption: "",
    linkUrl: "",
    categoryRef: "",
  });
  const [modalMediaFile, setModalMediaFile] = useState<File | null>(null);
  const [modalMediaPreview, setModalMediaPreview] = useState<string>("");

  // Full Screen Preview Modal (for Product or Media)
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [previewMedia, setPreviewMedia] = useState<MediaAsset | null>(null);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const modalMediaInputRef = useRef<HTMLInputElement>(null);
  const quickReplaceInputRef = useRef<HTMLInputElement>(null);
  const [quickReplaceTarget, setQuickReplaceTarget] = useState<MediaAsset | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("sassy_admin_token", data.token);
      } else {
        setAuthError(data.error || "Incorrect passcode");
      }
    } catch {
      setAuthError("Network error during login");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sassy_admin_token");
    setIsAuthenticated(false);
  };

  // Fetch catalog products from MongoDB
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch media assets (all present pictures and videos)
  const fetchMediaAssets = useCallback(async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setMediaAssets(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  }, []);

  // Fetch customer inquiries
  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    let ignore = false;

    async function loadData() {
      setIsLoading(true);
      try {
        const [prodRes, mediaRes, inqRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/media"),
          fetch("/api/inquiries"),
        ]);
        if (!ignore && prodRes.ok) {
          const pData = await prodRes.json();
          setProducts(pData.data || []);
        }
        if (!ignore && mediaRes.ok) {
          const mData = await mediaRes.json();
          setMediaAssets(mData.data || []);
        }
        if (!ignore && inqRes.ok) {
          const iData = await inqRes.json();
          setInquiries(iData.data || []);
        }
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  // Upload file (image or video) to Cloudinary or backend API
  const handleUploadFile = async (
    fileToUpload: File | string,
    typeHint?: "image" | "video"
  ): Promise<{ url: string; publicId: string; mediaType: "image" | "video" }> => {
    setIsUploadingMedia(true);
    setUploadProgressMsg(
      typeHint === "video"
        ? "Uploading and optimizing video stream..."
        : "Uploading image to Cloudinary..."
    );

    const bodyFormData = new FormData();
    if (typeof fileToUpload === "string") {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: fileToUpload, mediaType: typeHint }),
      });
      const data = await res.json();
      setIsUploadingMedia(false);
      if (!res.ok || !data.success) throw new Error(data.error || "Upload failed");
      return {
        url: data.url,
        publicId: data.publicId,
        mediaType: data.mediaType || typeHint || "image",
      };
    } else {
      bodyFormData.append("file", fileToUpload);
      if (typeHint) bodyFormData.append("mediaType", typeHint);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: bodyFormData,
      });
      const data = await res.json();
      setIsUploadingMedia(false);
      if (!res.ok || !data.success) throw new Error(data.error || "Upload failed");
      return {
        url: data.url,
        publicId: data.publicId,
        mediaType: data.mediaType || typeHint || "image",
      };
    }
  };

  // Handle local image selection in Product Form
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle local video selection in Product Form
  const handleProductVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit product creation or update
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formData.name || !formData.category || !formData.description) {
      setStatusMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    if (!editingId && !imageFile && !uploadedImageUrl && !imagePreview && !videoFile && !videoPreview) {
      setStatusMessage({ type: "error", text: "Please provide an image or video for this product." });
      return;
    }

    setIsLoading(true);

    try {
      let finalImageUrl = uploadedImageUrl || imagePreview;
      let finalPublicId = uploadedPublicId;
      let finalVideoUrl = uploadedVideoUrl || videoPreview || formData.video;
      let finalVideoPublicId = uploadedVideoPublicId;

      // If a new image file was selected, upload it
      if (imageFile) {
        setUploadProgressMsg("Uploading image to Cloudinary...");
        const uploadResult = await handleUploadFile(imageFile, "image");
        finalImageUrl = uploadResult.url;
        finalPublicId = uploadResult.publicId;
      }

      // If a new video file was selected, upload it
      if (videoFile) {
        setUploadProgressMsg("Uploading video to Cloudinary...");
        const videoUploadResult = await handleUploadFile(videoFile, "video");
        finalVideoUrl = videoUploadResult.url;
        finalVideoPublicId = videoUploadResult.publicId;
      }

      const payload = {
        ...formData,
        image: finalImageUrl || "/images/hero.jpg",
        cloudinaryPublicId: finalPublicId,
        video: finalVideoUrl,
        videoCloudinaryPublicId: finalVideoPublicId,
        mediaType: formData.mediaType,
      };

      if (editingId) {
        // Update product
        const res = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update product");

        setStatusMessage({
          type: "success",
          text: `Product "${formData.name}" and media updated successfully!`,
        });
      } else {
        // Create product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create product");

        setStatusMessage({
          type: "success",
          text: `Product "${formData.name}" added to catalog & saved to database!`,
        });
      }

      // Reset form
      setFormData({
        name: "",
        category: "Living Room",
        description: "",
        dimensions: "",
        material: "",
        featured: true,
        inStock: true,
        mediaType: "image",
        video: "",
      });
      setImageFile(null);
      setImagePreview("");
      setUploadedImageUrl("");
      setUploadedPublicId("");
      setVideoFile(null);
      setVideoPreview("");
      setUploadedVideoUrl("");
      setUploadedVideoPublicId("");
      setEditingId(null);

      // Refresh list & switch to products tab
      await fetchProducts();
      await fetchMediaAssets();
      setActiveTab("products");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to save product";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
      setIsUploadingMedia(false);
      setUploadProgressMsg("");
    }
  };

  // Start editing a product
  const handleEditClick = (product: Product) => {
    const id = product._id || product.id || "";
    setEditingId(id);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      dimensions: product.dimensions || "",
      material: product.material || "",
      featured: Boolean(product.featured),
      inStock: product.inStock !== undefined ? Boolean(product.inStock) : true,
      mediaType: product.mediaType || (product.video ? "video" : "image"),
      video: product.video || "",
    });
    setImagePreview(product.image);
    setUploadedImageUrl(product.image);
    setUploadedPublicId(product.cloudinaryPublicId || "");

    setVideoPreview(product.video || "");
    setUploadedVideoUrl(product.video || "");
    setUploadedVideoPublicId(product.videoCloudinaryPublicId || "");
    setActiveTab("add");
  };

  // Delete product
  const handleDeleteProduct = async (product: Product) => {
    const id = product._id || product.id;
    if (!id) return;

    if (
      !confirm(
        `Are you sure you want to delete "${product.name}"? This will also remove the image/video from storage.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatusMessage({ type: "success", text: `Deleted "${product.name}" successfully.` });
        fetchProducts();
        fetchMediaAssets();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product");
    }
  };

  // --- MEDIA ASSET OPERATIONS (ALL PRESENT PICTURES & VIDEOS) ---

  // Open modal to add new picture or video
  const handleOpenAddMediaModal = () => {
    setEditingMedia(null);
    setMediaFormData({
      title: "",
      section: "general",
      mediaType: "image",
      url: "",
      caption: "",
      linkUrl: "",
      categoryRef: "",
    });
    setModalMediaFile(null);
    setModalMediaPreview("");
    setIsMediaModalOpen(true);
  };

  // Open modal to edit existing picture or video
  const handleOpenEditMediaModal = (media: MediaAsset) => {
    setEditingMedia(media);
    setMediaFormData({
      title: media.title,
      section: media.section || "general",
      mediaType: media.mediaType || "image",
      url: media.url,
      caption: media.caption || "",
      linkUrl: media.linkUrl || "",
      categoryRef: media.categoryRef || "",
    });
    setModalMediaFile(null);
    setModalMediaPreview(media.url);
    setIsMediaModalOpen(true);
  };

  // Modal file selection
  const handleModalMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setModalMediaFile(file);
      const isVid = file.type.startsWith("video/");
      setMediaFormData((prev) => ({
        ...prev,
        mediaType: isVid ? "video" : "image",
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Media Asset (Create or Edit)
  const handleSaveMediaAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFormData.title) {
      alert("Please enter a media title.");
      return;
    }
    if (!editingMedia && !modalMediaFile && !mediaFormData.url && !modalMediaPreview) {
      alert("Please select a picture/video file or enter a media URL.");
      return;
    }

    setIsLoading(true);
    setUploadProgressMsg("Saving media asset...");

    try {
      let finalUrl = mediaFormData.url || modalMediaPreview;
      let finalPublicId = editingMedia?.cloudinaryPublicId || "";
      let finalMediaType = mediaFormData.mediaType;

      if (modalMediaFile) {
        setUploadProgressMsg("Uploading media file to Cloudinary...");
        const uploadResult = await handleUploadFile(modalMediaFile, mediaFormData.mediaType);
        finalUrl = uploadResult.url;
        finalPublicId = uploadResult.publicId;
        finalMediaType = uploadResult.mediaType;
      }

      const payload = {
        ...mediaFormData,
        mediaType: finalMediaType,
        url: finalUrl,
        cloudinaryPublicId: finalPublicId,
      };

      const mediaId = editingMedia?._id || editingMedia?.id;

      if (editingMedia && mediaId) {
        const res = await fetch(`/api/media/${mediaId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update media item");

        setStatusMessage({
          type: "success",
          text: `Media "${mediaFormData.title}" updated successfully!`,
        });
      } else {
        const res = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add media item");

        setStatusMessage({
          type: "success",
          text: `New ${finalMediaType} "${mediaFormData.title}" added to showroom!`,
        });
      }

      setIsMediaModalOpen(false);
      setEditingMedia(null);
      setModalMediaFile(null);
      setModalMediaPreview("");
      await fetchMediaAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving media";
      alert(msg);
    } finally {
      setIsLoading(false);
      setUploadProgressMsg("");
    }
  };

  // Delete Media Asset
  const handleDeleteMediaAsset = async (media: MediaAsset) => {
    const id = media._id || media.id;
    if (!id) return;

    if (
      !confirm(
        `Are you sure you want to delete "${media.title}"? This will permanently remove this ${media.mediaType} from the admin library and showroom.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: `Deleted ${media.mediaType} "${media.title}" successfully.`,
        });
        fetchMediaAssets();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete media item");
      }
    } catch (error) {
      console.error("Delete media error:", error);
      alert("Error deleting media item");
    }
  };

  // Quick Replace File trigger
  const handleTriggerQuickReplace = (media: MediaAsset) => {
    setQuickReplaceTarget(media);
    quickReplaceInputRef.current?.click();
  };

  const handleQuickReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !quickReplaceTarget) return;

    const mediaId = quickReplaceTarget._id || quickReplaceTarget.id;
    if (!mediaId) return;

    setIsLoading(true);
    setStatusMessage(null);
    setUploadProgressMsg(`Replacing file for "${quickReplaceTarget.title}"...`);

    try {
      const uploadRes = await handleUploadFile(
        file,
        file.type.startsWith("video/") ? "video" : "image"
      );

      const payload = {
        ...quickReplaceTarget,
        url: uploadRes.url,
        cloudinaryPublicId: uploadRes.publicId,
        mediaType: uploadRes.mediaType,
      };

      const res = await fetch(`/api/media/${mediaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update media file");
      }

      setStatusMessage({
        type: "success",
        text: `Successfully replaced ${quickReplaceTarget.title} with new ${uploadRes.mediaType}!`,
      });
      await fetchMediaAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error replacing file";
      alert(msg);
    } finally {
      setIsLoading(false);
      setUploadProgressMsg("");
      setQuickReplaceTarget(null);
      if (quickReplaceInputRef.current) {
        quickReplaceInputRef.current.value = "";
      }
    }
  };

  // Update inquiry status
  const handleUpdateInquiryStatus = async (
    id: string,
    newStatus: "new" | "contacted" | "completed"
  ) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  // Reseed default catalog and media assets
  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "This will reset products, all present showroom pictures, videos, and inquiries to the luxury default catalog. Continue?"
      )
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ type: "success", text: data.message });
        await fetchProducts();
        await fetchMediaAssets();
        await fetchInquiries();
      } else {
        alert(data.error || "Seed failed");
      }
    } catch {
      alert("Error during database seed");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      categoryFilter === "All" || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filtered media assets list (all present pictures & videos)
  const filteredMediaAssets = mediaAssets.filter((m) => {
    const matchesSection =
      mediaSectionFilter === "All" ||
      (mediaSectionFilter === "hero" && m.section === "hero") ||
      (mediaSectionFilter === "category" && m.section === "category") ||
      (mediaSectionFilter === "promo" && m.section === "promo") ||
      (mediaSectionFilter === "product" && m.section === "product") ||
      (mediaSectionFilter === "showcase" && (m.section === "showcase" || m.section === "gallery")) ||
      m.section === mediaSectionFilter;

    const matchesType =
      mediaTypeFilter === "All" || m.mediaType.toLowerCase() === mediaTypeFilter.toLowerCase();

    const matchesSearch =
      !mediaSearchQuery.trim() ||
      m.title.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
      (m.caption && m.caption.toLowerCase().includes(mediaSearchQuery.toLowerCase())) ||
      m.section.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
      (m.categoryRef && m.categoryRef.toLowerCase().includes(mediaSearchQuery.toLowerCase()));

    return matchesSection && matchesType && matchesSearch;
  });

  // Media counters
  const totalImagesCount = mediaAssets.filter((m) => m.mediaType === "image").length;
  const totalVideosCount = mediaAssets.filter((m) => m.mediaType === "video").length;

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#ede7df] text-center space-y-6">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1c1917]">Admin Portal</h2>
            <p className="text-xs sm:text-sm text-[#78716c] mt-1">
              Manage all pictures & videos, luxury catalog & customer inquiries
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] text-sm focus:outline-none focus:border-[#b37e44]"
                />
                <Lock size={16} className="absolute right-3.5 top-3.5 text-[#a1a1aa]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#f0ebe3] flex items-center justify-between text-xs text-[#8c827a]">
            <Link href="/" className="hover:text-[#b37e44] transition-colors">
              &larr; Back to Showroom
            </Link>
            <button
              onClick={() => {
                setPasscode("admin123");
              }}
              className="text-[#b37e44] font-medium hover:underline cursor-pointer"
            >
              Fill Demo Passcode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] flex flex-col">
      {/* Hidden input for quick replace file picker */}
      <input
        type="file"
        ref={quickReplaceInputRef}
        onChange={handleQuickReplaceFileChange}
        accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime"
        className="hidden"
      />

      {/* Admin Top Navigation Bar */}
      <header className="w-full bg-white border-b border-[#eae4da] sticky top-0 z-30 shadow-xs">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#f2e7d8] text-[#9c6b35] text-[11px] font-bold uppercase tracking-wider">
              Management Portal
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534e] hover:text-[#b37e44] bg-[#f8f5f0] px-3 py-1.5 rounded-lg border border-[#ebdccb] transition-colors"
            >
              <span>Live Showroom</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 container-custom py-8">
        {/* Status Toast / Notification */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm animate-fade-in ${
              statusMessage.type === "success"
                ? "bg-[#f0f9f3] text-[#15803d] border border-[#a3e0b5]"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="p-1 hover:opacity-70 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Admin Dashboard Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Stat 1: Total Products */}
          <div className="bg-white p-5 rounded-2xl border border-[#ede7df] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#78716c] font-medium uppercase tracking-wider">
                Showroom Pieces
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mt-1">
                {products.length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44]">
              <Layers size={20} />
            </div>
          </div>

          {/* Stat 2: Total Pictures & Videos */}
          <div className="bg-white p-5 rounded-2xl border border-[#ede7df] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#78716c] font-medium uppercase tracking-wider">
                Pictures & Videos
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mt-1 flex items-center gap-2">
                <span>{mediaAssets.length}</span>
                <span className="text-xs font-normal text-[#78716c]">
                  ({totalImagesCount} img, {totalVideosCount} vid)
                </span>
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44]">
              <Film size={20} />
            </div>
          </div>

          {/* Stat 3: Inquiries */}
          <div className="bg-white p-5 rounded-2xl border border-[#ede7df] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#78716c] font-medium uppercase tracking-wider">
                Client Inquiries
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mt-1">
                {inquiries.length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center text-[#16a34a]">
              <MessageSquare size={20} />
            </div>
          </div>

          {/* Stat 4: Cloudinary / Media Pipeline */}
          <div className="bg-white p-5 rounded-2xl border border-[#ede7df] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#78716c] font-medium uppercase tracking-wider">
                Media Pipeline
              </p>
              <h3 className="text-sm font-bold text-[#b37e44] mt-1 flex items-center gap-1.5">
                <Cloud size={16} />
                Images & Video Active
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44]">
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-between border-b border-[#e5ded4] mb-8 pb-3 overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab("products");
                setEditingId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "products"
                  ? "bg-[#18181b] text-white shadow-xs"
                  : "bg-white text-[#57534e] hover:bg-[#f2ece2] border border-[#e2d8ca]"
              }`}
            >
              Catalog Products ({products.length})
            </button>

            {/* TAB: ALL PICTURES & VIDEOS (MEDIA LIBRARY) */}
            <button
              onClick={() => {
                setActiveTab("media");
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "media"
                  ? "bg-[#18181b] text-white shadow-xs"
                  : "bg-white text-[#57534e] hover:bg-[#f2ece2] border border-[#e2d8ca]"
              }`}
            >
              <ImageIcon size={15} />
              <span>All Pictures & Videos ({mediaAssets.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("add");
                if (!editingId) {
                  setFormData({
                    name: "",
                    category: "Living Room",
                    description: "",
                    dimensions: "",
                    material: "",
                    featured: true,
                    inStock: true,
                    mediaType: "image",
                    video: "",
                  });
                  setImagePreview("");
                  setImageFile(null);
                  setVideoPreview("");
                  setVideoFile(null);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "add"
                  ? "bg-[#b37e44] text-white shadow-xs"
                  : "bg-white text-[#57534e] hover:bg-[#f2ece2] border border-[#e2d8ca]"
              }`}
            >
              <Plus size={16} />
              <span>{editingId ? "Edit Product" : "Add New Product"}</span>
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "inquiries"
                  ? "bg-[#18181b] text-white shadow-xs"
                  : "bg-white text-[#57534e] hover:bg-[#f2ece2] border border-[#e2d8ca]"
              }`}
            >
              <MessageSquare size={15} />
              <span>Inquiries ({inquiries.filter((i) => i.status === "new").length} New)</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "settings"
                  ? "bg-[#18181b] text-white shadow-xs"
                  : "bg-white text-[#57534e] hover:bg-[#f2ece2] border border-[#e2d8ca]"
              }`}
            >
              System & Database
            </button>
          </div>

          <button
            onClick={() => {
              fetchProducts();
              fetchMediaAssets();
              fetchInquiries();
            }}
            title="Refresh database records"
            className="p-2 rounded-xl bg-white border border-[#e2d8ca] text-[#78716c] hover:text-[#18181b] hover:bg-[#f5efe6] transition-colors flex items-center gap-1 text-xs cursor-pointer flex-shrink-0"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ALL PRODUCTS LIST */}
        {/* ========================================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#ede7df]">
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-3 top-3 text-[#a1a1aa]" />
                <input
                  type="text"
                  placeholder="Search catalog pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-[#78716c]">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                >
                  <option value="All">All Categories</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Office">Office</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Decor & Lighting">Decor & Lighting</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#ede7df] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#57534e]">
                  <thead className="bg-[#faf7f2] text-[#1c1917] uppercase tracking-wider font-semibold border-b border-[#ece5da]">
                    <tr>
                      <th className="px-6 py-4">Piece Preview</th>
                      <th className="px-6 py-4">Name & Specs</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Media Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ebe3]">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-[#8c827a]">
                          No products found. Click &quot;Add New Product&quot; to create one.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product: Product) => {
                        const key = product._id || product.id || product.name;
                        const hasVideo = Boolean(product.video);

                        return (
                          <tr key={key} className="hover:bg-[#fcfbfa] transition-colors">
                            {/* Thumbnail */}
                            <td className="px-6 py-4">
                              <div
                                onClick={() => setPreviewProduct(product)}
                                className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#f4efe8] border border-[#e2d8ca] cursor-pointer group"
                              >
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[#78716c]">
                                    <Video size={20} />
                                  </div>
                                )}
                                {hasVideo && (
                                  <span className="absolute bottom-1 right-1 bg-black/70 text-white rounded p-0.5 text-[9px]">
                                    <Video size={10} />
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Name & Details */}
                            <td className="px-6 py-4">
                              <h4 className="text-sm font-bold text-[#1c1917]">{product.name}</h4>
                              <p className="text-[11px] text-[#78716c] line-clamp-1 mt-0.5">
                                {product.material || "Bespoke Material"}
                              </p>
                              {product.dimensions && (
                                <p className="text-[10px] text-[#a1a1aa] mt-0.5 font-mono">
                                  {product.dimensions}
                                </p>
                              )}
                            </td>

                            {/* Category Badge */}
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 rounded-full bg-[#f2e7d8] text-[#9c6b35] text-[11px] font-semibold">
                                {product.category}
                              </span>
                            </td>

                            {/* Media Type Indicator */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                {hasVideo ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200">
                                    <Video size={11} /> Photo + Video
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200">
                                    <ImageIcon size={11} /> Photo
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* In Stock / Featured */}
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#16a34a]">
                                  <Check size={12} /> Available
                                </span>
                                {product.featured && (
                                  <div className="text-[10px] text-[#b37e44] font-semibold">
                                    ★ Featured Showcase
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setPreviewProduct(product)}
                                  title="View Piece Details & Media"
                                  className="p-2 rounded-lg bg-[#f8f5f0] text-[#57534e] hover:text-[#b37e44] hover:bg-[#f0ebe3] transition-colors cursor-pointer"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  onClick={() => handleEditClick(product)}
                                  title="Edit Piece & Replace Media"
                                  className="p-2 rounded-lg bg-[#f8f5f0] text-[#57534e] hover:text-[#18181b] hover:bg-[#f0ebe3] transition-colors cursor-pointer"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product)}
                                  title="Delete Piece & Media"
                                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ALL PICTURES & VIDEOS (MEDIA LIBRARY & SHOWROOM ASSETS) */}
        {/* ========================================================================= */}
        {activeTab === "media" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Title and "Upload New Media" Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#ede7df]">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1c1917] flex items-center gap-2">
                  <Film size={20} className="text-[#b37e44]" />
                  <span>Showroom Pictures & Video Library</span>
                </h3>
                <p className="text-xs text-[#78716c] mt-1">
                  All present website pictures, category banners, promos, hero display, showcase videos, and product media. You can edit, replace, preview, or delete any item.
                </p>
              </div>

              <button
                onClick={handleOpenAddMediaModal}
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <Plus size={16} />
                <span>Upload New Picture or Video</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#ede7df]">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3 top-3 text-[#a1a1aa]" />
                <input
                  type="text"
                  placeholder="Search pictures and videos..."
                  value={mediaSearchQuery}
                  onChange={(e) => setMediaSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44]"
                />
              </div>

              {/* Section Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-semibold text-[#78716c] flex items-center gap-1">
                  <Filter size={13} /> Section:
                </span>
                <select
                  value={mediaSectionFilter}
                  onChange={(e) => setMediaSectionFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                >
                  <option value="All">All Sections ({mediaAssets.length})</option>
                  <option value="hero">Hero Banner</option>
                  <option value="category">Room Categories</option>
                  <option value="promo">Promotional Banners</option>
                  <option value="product">Product Pictures</option>
                  <option value="showcase">Showcase & Workshop Videos</option>
                  <option value="general">General Media</option>
                </select>

                <span className="text-xs font-semibold text-[#78716c] ml-2">Type:</span>
                <select
                  value={mediaTypeFilter}
                  onChange={(e) => setMediaTypeFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                >
                  <option value="All">All Types</option>
                  <option value="image">Images Only ({totalImagesCount})</option>
                  <option value="video">Videos Only ({totalVideosCount})</option>
                </select>
              </div>
            </div>

            {/* Visual Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredMediaAssets.length === 0 ? (
                <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-[#ede7df] p-8">
                  <ImageIcon size={36} className="text-[#a1a1aa] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#1c1917]">No media found</h4>
                  <p className="text-xs text-[#78716c] mt-1">
                    Try adjusting your search filter or click &quot;Upload New Picture or Video&quot; above.
                  </p>
                </div>
              ) : (
                filteredMediaAssets.map((media) => {
                  const mediaId = media._id || media.id || media.url;
                  const isVideo = media.mediaType === "video";

                  const sectionColor =
                    media.section === "hero"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : media.section === "category"
                      ? "bg-blue-100 text-blue-900 border-blue-300"
                      : media.section === "promo"
                      ? "bg-purple-100 text-purple-900 border-purple-300"
                      : media.section === "product"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                      : "bg-rose-100 text-rose-900 border-rose-300";

                  return (
                    <div
                      key={mediaId}
                      className="bg-white rounded-2xl border border-[#ede7df] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Media Thumbnail Container */}
                      <div className="relative aspect-[4/3] w-full bg-[#f4efe8] overflow-hidden">
                        {isVideo ? (
                          <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                            <video
                              src={media.url}
                              className="w-full h-full object-cover opacity-80"
                              muted
                              playsInline
                              preload="metadata"
                            />
                            <button
                              onClick={() => setPreviewMedia(media)}
                              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group"
                            >
                              <div className="w-12 h-12 rounded-full bg-white/90 text-[#18181b] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play size={20} className="ml-1 fill-[#18181b]" />
                              </div>
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => setPreviewMedia(media)}
                            className="relative w-full h-full cursor-pointer"
                          >
                            <Image
                              src={media.url}
                              alt={media.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-xs ${sectionColor}`}
                          >
                            {media.section}
                          </span>

                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs flex items-center gap-1">
                            {isVideo ? <Video size={11} /> : <ImageIcon size={11} />}
                            <span>{media.mediaType}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content & Metadata */}
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1c1917] line-clamp-1">
                            {media.title}
                          </h4>
                          {media.caption && (
                            <p className="text-[11px] text-[#78716c] line-clamp-2 mt-1">
                              {media.caption}
                            </p>
                          )}
                          {media.categoryRef && (
                            <span className="inline-block mt-2 text-[10px] font-semibold text-[#b37e44] bg-[#faf5ee] px-2 py-0.5 rounded border border-[#ebdccb]">
                              Category: {media.categoryRef}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 mt-3 border-t border-[#f0ebe3] flex items-center justify-between gap-1.5">
                          {/* Quick Replace File */}
                          <button
                            onClick={() => handleTriggerQuickReplace(media)}
                            title="Replace image or video file directly"
                            className="px-2.5 py-1 rounded-lg bg-[#faf5ee] text-[#b37e44] hover:bg-[#f4ece1] border border-[#ebdccb] text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Upload size={12} />
                            <span>Replace</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setPreviewMedia(media)}
                              title="Full Screen Preview"
                              className="p-1.5 rounded-lg bg-[#f8f5f0] text-[#57534e] hover:text-[#b37e44] hover:bg-[#f0ebe3] transition-colors cursor-pointer"
                            >
                              <Maximize2 size={13} />
                            </button>

                            <button
                              onClick={() => handleOpenEditMediaModal(media)}
                              title="Edit Media Details / URL"
                              className="p-1.5 rounded-lg bg-[#f8f5f0] text-[#57534e] hover:text-[#18181b] hover:bg-[#f0ebe3] transition-colors cursor-pointer"
                            >
                              <Edit3 size={13} />
                            </button>

                            <button
                              onClick={() => handleDeleteMediaAsset(media)}
                              title="Delete Media Asset"
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: UPLOAD / ADD OR EDIT PRODUCT */}
        {/* ========================================================================= */}
        {activeTab === "add" && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#ede7df] shadow-sm animate-fade-in">
            <div className="border-b border-[#f0ebe3] pb-4 mb-6">
              <h3 className="text-2xl font-serif font-bold text-[#1c1917]">
                {editingId ? "Edit Showcase Piece" : "Upload New Picture, Video & Piece"}
              </h3>
              <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                Upload high resolution photos and showcase video clips directly to Cloudinary and catalog them in MongoDB.
              </p>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-6">
              {/* Picture Upload Area */}
              <div>
                <label className="block text-xs font-bold text-[#1c1917] uppercase tracking-wider mb-2">
                  1. Product Main Photo (Cloudinary Pipeline) <span className="text-rose-500">*</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Upload Dropzone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#dcd4c8] hover:border-[#b37e44] bg-[#fcfbfa] hover:bg-[#f8f5f0] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px]"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProductImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44] mb-3">
                      <Upload size={22} />
                    </div>
                    <h4 className="text-sm font-bold text-[#1c1917]">
                      {imageFile ? imageFile.name : "Click or Drag to Upload Picture"}
                    </h4>
                    <p className="text-xs text-[#78716c] mt-1">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                    <span className="mt-3 px-3 py-1 bg-white border border-[#e2d8ca] rounded-lg text-[11px] font-semibold text-[#57534e]">
                      Browse Photo
                    </span>
                  </div>

                  {/* Image Live Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#78716c]">Photo Preview</span>
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                            setUploadedImageUrl("");
                          }}
                          className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                        >
                          Clear Photo
                        </button>
                      )}
                    </div>
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#e2d8ca] flex items-center justify-center">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center p-4 text-[#a1a1aa] text-xs">
                          No picture selected yet. Selected picture will preview here.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Upload / URL Section */}
              <div className="pt-4 border-t border-[#f0ebe3]">
                <label className="block text-xs font-bold text-[#1c1917] uppercase tracking-wider mb-2">
                  2. Product Video Highlight (Optional Video Clip)
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Video Dropzone & URL input */}
                  <div className="space-y-3">
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="border-2 border-dashed border-[#dcd4c8] hover:border-[#b37e44] bg-[#fcfbfa] hover:bg-[#f8f5f0] rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px]"
                    >
                      <input
                        type="file"
                        ref={videoInputRef}
                        onChange={handleProductVideoChange}
                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-full bg-[#f3e8ff] border border-[#e9d5ff] flex items-center justify-center text-[#7e22ce] mb-2">
                        <Video size={20} />
                      </div>
                      <h4 className="text-xs font-bold text-[#1c1917]">
                        {videoFile ? videoFile.name : "Upload Video File (MP4, WebM, MOV)"}
                      </h4>
                      <span className="mt-2 px-3 py-1 bg-white border border-[#e2d8ca] rounded-lg text-[10px] font-semibold text-[#57534e]">
                        Browse Video
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#78716c] block mb-1">
                        Or paste direct Video URL (MP4 / Cloudinary / Storage link):
                      </span>
                      <input
                        type="url"
                        placeholder="e.g. https://.../video.mp4"
                        value={formData.video}
                        onChange={(e) => {
                          setFormData({ ...formData, video: e.target.value });
                          if (!videoFile) setVideoPreview(e.target.value);
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44]"
                      />
                    </div>
                  </div>

                  {/* Video Live Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#78716c]">Video Preview</span>
                      {(videoPreview || formData.video) && (
                        <button
                          type="button"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoPreview("");
                            setUploadedVideoUrl("");
                            setFormData({ ...formData, video: "" });
                          }}
                          className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                        >
                          Clear Video
                        </button>
                      )}
                    </div>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#e2d8ca] flex items-center justify-center">
                      {videoPreview || formData.video ? (
                        <video
                          src={videoPreview || formData.video}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4 text-[#a1a1aa] text-xs">
                          No video added yet. Uploaded or linked video will preview here.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {uploadProgressMsg && (
                  <p className="text-xs text-[#b37e44] font-medium mt-3 flex items-center gap-1.5">
                    <RefreshCw size={13} className="animate-spin" />
                    <span>{uploadProgressMsg}</span>
                  </p>
                )}
              </div>

              {/* Product Specifications Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1.5">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kensington Solid Walnut Credenza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining Room">Dining Room</option>
                    <option value="Office">Office</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Decor & Lighting">Decor & Lighting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1.5">
                    Material / Craftsmanship
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Solid Natural White Oak & Boucle"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1.5">
                    Dimensions (W x D x H)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. W 220cm x D 95cm x H 82cm"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c1917] mb-1.5">
                  Architectural Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the aesthetic, framing, and interior applications..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917] resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#27272a]">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#b37e44] focus:ring-[#b37e44]"
                  />
                  <span>Feature in Homepage Showcase</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#27272a]">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-[#b37e44] focus:ring-[#b37e44]"
                  />
                  <span>Available in Showroom</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0ebe3]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("products");
                    setEditingId(null);
                  }}
                  className="btn-secondary text-xs sm:text-sm py-2.5 px-5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isUploadingMedia}
                  className="btn-primary text-xs sm:text-sm py-2.5 px-6 flex items-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <Upload size={15} />
                  <span>
                    {isLoading
                      ? "Saving to Database..."
                      : editingId
                      ? "Update Product & Media"
                      : "Save & Publish Piece"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CUSTOMER INQUIRIES */}
        {/* ========================================================================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#1c1917]">
                  Customer Contact Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-[#78716c] mt-0.5">
                  Direct requests submitted via product cards and showroom consultation forms
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.length === 0 ? (
                <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-[#ede7df] p-8">
                  <MessageSquare size={36} className="text-[#a1a1aa] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#1c1917]">No inquiries yet</h4>
                  <p className="text-xs text-[#78716c] mt-1">
                    When customers inquire about products on the showroom, messages appear here.
                  </p>
                </div>
              ) : (
                inquiries.map((inquiry) => {
                  const whatsappReply = `https://wa.me/${(inquiry.phone || "").replace(
                    /[^0-9]/g,
                    ""
                  )}?text=${encodeURIComponent(
                    `Hello ${inquiry.name}, thank you for contacting Sassy Furniture regarding ${inquiry.productName}.`
                  )}`;

                  return (
                    <div
                      key={inquiry._id}
                      className="bg-white rounded-2xl p-5 border border-[#ede7df] shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div>
                        {/* Header: Name, Date & Status */}
                        <div className="flex items-start justify-between gap-2 border-b border-[#f4f0ea] pb-3 mb-3">
                          <div>
                            <h4 className="text-sm font-bold text-[#1c1917]">{inquiry.name}</h4>
                            <p className="text-[11px] text-[#b37e44] font-semibold mt-0.5">
                              Inquiring about: {inquiry.productName}
                            </p>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inquiry.status === "new"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : inquiry.status === "contacted"
                                ? "bg-blue-100 text-blue-800 border border-blue-300"
                                : "bg-green-100 text-green-800 border border-green-300"
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>

                        {/* Message Content */}
                        <p className="text-xs text-[#44403c] whitespace-pre-line bg-[#faf7f2] p-3 rounded-xl border border-[#ede5da]">
                          {inquiry.message}
                        </p>

                        {/* Contacts */}
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#57534e]">
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="flex items-center gap-1 hover:text-[#b37e44]"
                          >
                            <Mail size={13} className="text-[#b37e44]" />
                            <span>{inquiry.email}</span>
                          </a>
                          {inquiry.phone && (
                            <a
                              href={`tel:${inquiry.phone}`}
                              className="flex items-center gap-1 hover:text-[#b37e44]"
                            >
                              <Phone size={13} className="text-[#b37e44]" />
                              <span>{inquiry.phone}</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#f4f0ea]">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleUpdateInquiryStatus(inquiry._id, "contacted")}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#f0f4f8] text-[#1e40af] hover:bg-[#e2e8f0] cursor-pointer"
                          >
                            Mark Contacted
                          </button>
                          <button
                            onClick={() => handleUpdateInquiryStatus(inquiry._id, "completed")}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#f0fdf4] text-[#15803d] hover:bg-[#dcfce7] cursor-pointer"
                          >
                            Done
                          </button>
                        </div>

                        {inquiry.phone && (
                          <a
                            href={whatsappReply}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-[11px] font-semibold"
                          >
                            <MessageSquare size={12} />
                            <span>WhatsApp Reply</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SYSTEM & DATABASE */}
        {/* ========================================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#ede7df] shadow-xs space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1c1917]">System & Integrations</h3>
              <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                Manage backend database seeding, Cloudinary pipeline and server settings.
              </p>
            </div>

            {/* Integration Details */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
                    MongoDB Connection
                  </h4>
                  <p className="text-xs text-[#57534e] mt-0.5 font-mono">
                    {process.env.NEXT_PUBLIC_MONGODB_STATUS || "Connected via Mongoose (App Router)"}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-bold">
                  Active
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
                    Cloudinary Storage Pipeline
                  </h4>
                  <p className="text-xs text-[#57534e] mt-0.5 font-mono">
                    Folder: sassy_furniture (Auto Image & Video processing)
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  Configured
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-[#f0ebe3] space-y-3">
              <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
                Database Maintenance
              </h4>
              <button
                onClick={handleSeedDatabase}
                disabled={isLoading}
                className="w-full p-3.5 rounded-2xl bg-[#faf5ee] hover:bg-[#f4ece1] border border-[#ebdccb] text-[#9c6b35] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
                <span>Reseed Database with Luxury Showroom Catalog & All Media</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD OR EDIT MEDIA ASSET (IMAGE OR VIDEO) */}
      {/* ========================================================================= */}
      {isMediaModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
          onClick={() => setIsMediaModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative border border-[#ede7df] shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMediaModalOpen(false)}
              className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b] p-1 cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#1c1917] mb-1">
              {editingMedia ? "Edit Showroom Picture / Video" : "Upload New Picture or Video"}
            </h3>
            <p className="text-xs text-[#78716c] mb-6">
              Assign to a section (Hero, Category, Promo, Showcase, Product) and upload high quality files.
            </p>

            <form onSubmit={handleSaveMediaAsset} className="space-y-4">
              {/* Title & Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    Title / Asset Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Bedroom Luxury Suite"
                    value={mediaFormData.title}
                    onChange={(e) =>
                      setMediaFormData({ ...mediaFormData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    Section Placement <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={mediaFormData.section}
                    onChange={(e) =>
                      setMediaFormData({
                        ...mediaFormData,
                        section: e.target.value as MediaSection,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44]"
                  >
                    <option value="hero">Hero Banner</option>
                    <option value="category">Room Category</option>
                    <option value="promo">Promotional Banner</option>
                    <option value="product">Product Piece</option>
                    <option value="showcase">Showcase Video & Highlight</option>
                    <option value="general">General Media</option>
                  </select>
                </div>
              </div>

              {/* Category ref if section is category */}
              {mediaFormData.section === "category" && (
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    Target Room Category
                  </label>
                  <select
                    value={mediaFormData.categoryRef}
                    onChange={(e) =>
                      setMediaFormData({ ...mediaFormData, categoryRef: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44]"
                  >
                    <option value="">Select Room...</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining Room">Dining Room</option>
                    <option value="Office">Office</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Decor & Lighting">Decor & Lighting</option>
                  </select>
                </div>
              )}

              {/* Media File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-[#1c1917] mb-1">
                  Upload Image or Video File
                </label>
                <div
                  onClick={() => modalMediaInputRef.current?.click()}
                  className="border-2 border-dashed border-[#dcd4c8] hover:border-[#b37e44] bg-[#fcfbfa] hover:bg-[#f8f5f0] rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[110px]"
                >
                  <input
                    type="file"
                    ref={modalMediaInputRef}
                    onChange={handleModalMediaChange}
                    accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                  />
                  <div className="w-9 h-9 rounded-full bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44] mb-1.5">
                    <Upload size={16} />
                  </div>
                  <p className="text-xs font-bold text-[#1c1917]">
                    {modalMediaFile ? modalMediaFile.name : "Click to select Photo or Video"}
                  </p>
                  <p className="text-[10px] text-[#78716c]">PNG, JPG, WEBP, MP4, WebM</p>
                </div>
              </div>

              {/* Media URL Direct Input */}
              <div>
                <label className="block text-xs font-bold text-[#1c1917] mb-1">
                  Or Direct Media URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /images/hero.jpg or https://.../video.mp4"
                  value={mediaFormData.url}
                  onChange={(e) => {
                    const val = e.target.value;
                    const isVid = val.includes("video/") || val.match(/\.(mp4|webm|mov|ogg)$/i);
                    setMediaFormData({
                      ...mediaFormData,
                      url: val,
                      mediaType: isVid ? "video" : "image",
                    });
                    if (!modalMediaFile) setModalMediaPreview(val);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44]"
                />
              </div>

              {/* Live Preview in Modal */}
              {(modalMediaPreview || mediaFormData.url) && (
                <div className="rounded-xl overflow-hidden bg-[#faf7f2] border border-[#e2d8ca] p-2">
                  <span className="text-[10px] font-semibold text-[#78716c] block mb-1">
                    Live Preview ({mediaFormData.mediaType}):
                  </span>
                  {mediaFormData.mediaType === "video" ? (
                    <video
                      src={modalMediaPreview || mediaFormData.url}
                      controls
                      className="w-full max-h-48 rounded-lg object-contain bg-black"
                    />
                  ) : (
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-white">
                      <Image
                        src={modalMediaPreview || mediaFormData.url}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-[#1c1917] mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  placeholder="Optional display caption or room styling notes..."
                  value={mediaFormData.caption}
                  onChange={(e) =>
                    setMediaFormData({ ...mediaFormData, caption: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#f0ebe3]">
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  <CheckSquare size={14} />
                  <span>{editingMedia ? "Save Media Changes" : "Publish to Showroom"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN PREVIEW MODAL (FOR MEDIA ASSET) */}
      {/* ========================================================================= */}
      {previewMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 relative border border-[#ede7df] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-black flex items-center justify-center">
              {previewMedia.mediaType === "video" ? (
                <video
                  src={previewMedia.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f2e7d8] text-[#9c6b35] text-xs font-bold uppercase">
                {previewMedia.section} &bull; {previewMedia.mediaType}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const cur = previewMedia;
                    setPreviewMedia(null);
                    handleOpenEditMediaModal(cur);
                  }}
                  className="text-xs font-semibold text-[#b37e44] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    const cur = previewMedia;
                    setPreviewMedia(null);
                    handleDeleteMediaAsset(cur);
                  }}
                  className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#1c1917] mt-2">
              {previewMedia.title}
            </h3>
            {previewMedia.caption && (
              <p className="text-xs text-[#57534e] mt-1.5 leading-relaxed">
                {previewMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN PREVIEW MODAL (FOR PRODUCT) */}
      {/* ========================================================================= */}
      {previewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 relative border border-[#ede7df] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b] cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-[#faf7f2] flex items-center justify-center">
              {previewProduct.video ? (
                <video
                  src={previewProduct.video}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : previewProduct.image ? (
                <Image
                  src={previewProduct.image}
                  alt={previewProduct.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-xs text-[#78716c]">No media available</div>
              )}
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-[#f2e7d8] text-[#9c6b35] text-xs font-semibold uppercase">
              {previewProduct.category}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1c1917] mt-2">
              {previewProduct.name}
            </h3>
            <p className="text-xs text-[#57534e] mt-2 leading-relaxed">
              {previewProduct.description}
            </p>
            <div className="mt-3 text-xs text-[#78716c] space-y-1">
              <p>
                <strong>Material:</strong> {previewProduct.material || "Bespoke"}
              </p>
              <p>
                <strong>Dimensions:</strong> {previewProduct.dimensions || "Custom"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
