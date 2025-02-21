import { useContext, useState } from "react";
import InputError from "../../Components/Ui/InputError";
import InputLabel from "../../Components/Ui/InputLabel";
import TextInput from "../../Components/Ui/TextInput";
import { ThumbsUp, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/login", formData);

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
                                Login Now
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

                    <form className="space-y-4" onSubmit={handleLogin}>

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
                                    onChange={(e) => setFormData("email", e.target.value)}
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
                                    onChange={(e) => setFormData("password", e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            disabled={processing}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
