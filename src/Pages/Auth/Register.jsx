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

        const { data } = await axios.post("/api/register", formData);

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
        }
    }

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            {/* Left Section - Hero */}
            <div className="relative hidden md:block">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cuqYLUCKi1elKqWua74DxQGbcH7r13.png')`,
                    }}
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-8 text-center">
                    <div className="max-w-md space-y-4">
                        <div className="inline-block bg-[#9deb3b] rounded-lg px-6 py-3">
                            <div className="flex items-center gap-2 text-black font-semibold text-xl">
                                <ThumbsUp className="h-6 w-6" />
                                Register Now
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
                        <p className="text-lg">
                            Join us today and start enjoying our services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">Get Started With Dreamsports</h1>
                        <p className="text-muted-foreground">
                            Ignite your sports journey with DreamSports and get started now.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        {/* Username */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="username" value="Username" />
                            <div className="relative">
                                <TextInput
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    className="w-full"
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    required
                                />
                                <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                            <InputError message={errors.username} />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="email" value="Email" />
                            <div className="relative">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="w-full"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    className="w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    className="w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password_confirmation: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* User Type */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="user_type" value="User Type" />
                            <select
                                id="user_type"
                                name="user_type"
                                value={formData.user_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, user_type: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded focus:border-indigo-500"
                            >
                                <option value="renter">Người chơi</option>
                                <option value="owner">Chủ sân</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
