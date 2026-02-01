import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-destructive/10 mx-auto mb-6 flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-destructive" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Page Not Found</h1>
                <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-button)] bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                    <Home className="w-4 h-4" />
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
