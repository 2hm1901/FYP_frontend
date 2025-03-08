import { useContext, useState } from "react";
import InputError from "../../Components/Ui/InputError";
import InputLabel from "../../Components/Ui/InputLabel";
import TextInput from "../../Components/Ui/TextInput";
import { ThumbsUp, User, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_type: "renter",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/register", formData);
            if (data.errors) {
                setErrors(data.errors);
            } else {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
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
                            <span className="text-black font-semibold text-xl">Register Now</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Join DreamSports</h1>
                        <p className="text-lg leading-relaxed">
                            Create your account and start your sports adventure today.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-600 text-sm">
                            Sign up to start your journey with DreamSports.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {/* Username */}
                        <div className="space-y-2">
                            <label htmlFor="username" value="Username" className="text-sm font-medium text-gray-700" />
                            <div className="relative">
                                <input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="text-red-600 text-sm" />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="password_confirmation" value="Confirm Password" className="text-sm font-medium text-gray-700" />
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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

                        {/* User Type */}
                        <div className="space-y-2">
                            <label htmlFor="user_type" value="User Type" className="text-sm font-medium text-gray-700" />
                            <select
                                id="user_type"
                                name="user_type"
                                value={formData.user_type}
                                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                            >
                                <option value="renter">Người chơi</option>
                                <option value="owner">Chủ sân</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-indigo-600 hover:underline font-medium">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}