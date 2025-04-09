import { useContext, useState } from "react";
import InputError from "../../Components/Ui/InputError";
import { ThumbsUp, User, Mail, Eye, EyeOff, CreditCard, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_type: "renter",
        account_number: "",
        bank_name: "",
        qr_code: null,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [qrCodePreview, setQrCodePreview] = useState(null);

    const handleQrCodeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrCodePreview(reader.result);
                setFormData({ ...formData, qr_code: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/register", formData);
            if (data.errors) {
                setErrors(data.errors);
                toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
            } else {
                toast.success(data.message || "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.", {
                    onClose: () => navigate("/login"),
                    autoClose: 2000,
                });
                setErrors({});
            }
        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
                toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
            }
        }
    }

    return (
        <div className="grid min-h-screen bg-gray-100 md:grid-cols-2">
            {/* Left Section - Hero */}
            <div className="relative hidden md:block">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cuqYLUCKi1elKqWua74DxQGbcH7r13.png')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/50 flex flex-col items-center justify-center text-white p-8 text-center">
                    <div className="max-w-md space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#9deb3b] rounded-full px-6 py-3 shadow-lg">
                            <ThumbsUp className="h-6 w-6 text-black" />
                            <span className="text-black font-semibold text-xl">Get Started</span>
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight">Join DreamSports</h1>
                        <p className="text-xl leading-relaxed">
                            Your sports journey begins here. Sign up now!
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold text-gray-900">Sign Up</h1>
                        <p className="text-gray-500 text-base">
                            Create your DreamSports account in minutes.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {/* User Type - Moved to top with button selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 block">
                                Bạn là:
                            </label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, user_type: "renter" })}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                                        formData.user_type === "renter"
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Lông thủ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, user_type: "owner" })}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                                        formData.user_type === "owner"
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Chủ sân
                                </button>
                            </div>
                            <InputError message={errors.user_type} className="text-red-600 text-sm" />
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    required
                                />
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <InputError message={errors.username} className="text-red-600 text-sm" />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <InputError message={errors.email} className="text-red-600 text-sm" />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="text-red-600 text-sm" />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setFormData({ ...formData, password_confirmation: e.target.value })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="text-red-600 text-sm" />
                        </div>

                        {/* Bank Account Information - Only for owners */}
                        {formData.user_type === "owner" && (
                            <div className="space-y-4 border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-medium text-gray-900">Thông tin ngân hàng</h3>
                                
                                {/* Account Number */}
                                <div className="space-y-2">
                                    <label htmlFor="account_number" className="text-sm font-medium text-gray-700">
                                        Số tài khoản ngân hàng
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="account_number"
                                            name="account_number"
                                            value={formData.account_number}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                            onChange={(e) =>
                                                setFormData({ ...formData, account_number: e.target.value })
                                            }
                                            required
                                        />
                                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                    <InputError message={errors.account_number} className="text-red-600 text-sm" />
                                </div>

                                {/* Bank Name */}
                                <div className="space-y-2">
                                    <label htmlFor="bank_name" className="text-sm font-medium text-gray-700">
                                        Tên ngân hàng
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="bank_name"
                                            name="bank_name"
                                            value={formData.bank_name}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                            onChange={(e) =>
                                                setFormData({ ...formData, bank_name: e.target.value })
                                            }
                                            required
                                        />
                                        <Building className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                    <InputError message={errors.bank_name} className="text-red-600 text-sm" />
                                </div>

                                {/* QR Code */}
                                <div className="space-y-2">
                                    <label htmlFor="qr_code" className="text-sm font-medium text-gray-700">
                                        Mã QR thanh toán
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            {qrCodePreview ? (
                                                <div className="mb-4">
                                                    <img 
                                                        src={qrCodePreview} 
                                                        alt="QR Code Preview" 
                                                        className="mx-auto h-32 w-32 object-contain"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setQrCodePreview(null);
                                                            setFormData({ ...formData, qr_code: null });
                                                        }}
                                                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        Xóa ảnh
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="qr_code_file"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                        >
                                                            <span>Tải lên ảnh</span>
                                                            <input
                                                                id="qr_code_file"
                                                                name="qr_code_file"
                                                                type="file"
                                                                className="sr-only"
                                                                accept="image/*"
                                                                onChange={handleQrCodeChange}
                                                            />
                                                        </label>
                                                        <p className="pl-1">hoặc kéo thả</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF lên đến 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <InputError message={errors.qr_code} className="text-red-600 text-sm" />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-300"
                        >
                            Sign Up Now
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-indigo-600 hover:underline font-semibold">
                            Log in
                        </a>
                    </p>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
}