import { ShoppingBag } from 'lucide-react';

function LoadingScreen({ loadingMessage = "Preparing your experience" }) {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-white via-slate-50 to-emerald-50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center justify-center space-y-8 px-4">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-emerald-600 p-4 rounded-2xl shadow-lg">
                        <ShoppingBag className="w-12 h-12 text-white" strokeWidth={2} />
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
                            IndoreMart
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">
                            {loadingMessage}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>

                    <p className="text-xs text-slate-400">
                        This may take a moment
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;
