import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("NeuroDent Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-5 text-center">
                    <div className="bg-white border-2 border-red-500 rounded-lg p-8 max-w-md w-full shadow-lg">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                            <span className="font-bold text-xl">!</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">System Error</h1>
                        <p className="text-sm text-slate-600 mb-6 font-mono bg-slate-50 p-3 rounded border border-slate-200 text-left overflow-auto max-h-32">
                            {this.state.error?.toString() || "Unknown rendering error occurred."}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors rounded-md"
                        >
                            [ REBOOT SYSTEM ]
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
