import { useContext, useState } from "react";
import InputError from "../../Components/Ui/InputError";
import InputLabel from "../../Components/Ui/InputLabel";
import TextInput from "../../Components/Ui/TextInput";
import { ThumbsUp, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setErrors({});
        setAuthError("");
        
        try {
            const { data } = await axios.post("/api/login", formData);
            if (data.errors) {
                setErrors(data.errors);
            } else if (data.success === false) {
                setAuthError(data.message);
            } else {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response) {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else if (error.response.data.message) {
                    setAuthError(error.response.data.message);
                } else if (error.response.data.success === false) {
                    setAuthError(error.response.data.message || "Đăng nhập thất bại");
                }
            } else {
                setAuthError("Lỗi kết nối đến máy chủ");
            }
        }
    }

    return (
        <div className="grid min-h-screen bg-gray-50 md:grid-cols-2">
            {/* Left Section - Hero */}
            <div className="relative hidden md:block">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cuqYLUCKi1elKqWua74DxQGbcH7r13.png')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 flex flex-col items-center justify-center text-white p-8 text-center">
                    <div className="max-w-md space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#9deb3b] rounded-full px-6 py-3 shadow-lg">
                            <ThumbsUp className="h-6 w-6 text-black" />
                            <span className="text-black font-semibold text-xl">Login Now</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Welcome to DreamSports</h1>
                        <p className="text-lg leading-relaxed">
                            Ignite your sports journey and unlock a world of opportunities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
                        <p className="text-gray-600 text-sm">
                            Log in to your DreamSports account and get started.
                        </p>
                    </div>

                    {authError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{authError}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" value="Email" className="text-sm font-medium text-gray-700" />
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                            <label htmlFor="password" value="Password" className="text-sm font-medium text-gray-700" />
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="text-red-600 text-sm" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-center text-sm text-gray-600">
                        Don't remember your password?{" "}
                        <Link to="/forgot-password" className="text-indigo-600 hover:underline font-medium">
                            Reset Password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}