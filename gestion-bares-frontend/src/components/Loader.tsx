import React from 'react';

export const Loader = ({ loading, children }: { loading: boolean, children: React.ReactNode }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-blue-500" />
            </div>
        );
    }

    return <>{children}</>;
};
