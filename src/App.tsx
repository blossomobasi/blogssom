import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogIdPage from "./pages/BlogIdPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import ProtectRoute from "./components/ProtectRoute";
import MyBlogsPage from "./pages/MyBlogsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />

				<ToastContainer newestOnTop={true} pauseOnHover={true} autoClose={3000} draggable />

				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<HomePage />} />
						<Route path="/blogs" element={<BlogPage />} />
						<Route path="/blogs/:blogId" element={<BlogIdPage />} />
						<Route
							path="/my-blogs"
							element={
								<ProtectRoute>
									<MyBlogsPage />
								</ProtectRoute>
							}
						/>
						<Route
							path="/blogs/create"
							element={
								<ProtectRoute>
									<CreateBlogPage />
								</ProtectRoute>
							}
						/>
					</Route>

					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
					<Route path="/reset-password" element={<ResetPasswordPage />} />

					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
