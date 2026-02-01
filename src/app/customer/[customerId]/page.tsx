"use client";

import { CustomerDetailPage } from "@/app/components/CustomerDetailPage";
import { useParams } from "next/navigation";

export default function Page() {
    // We can also pass params directly if CustomerDetailPage accepted props, 
    // but if it uses useParams internally, we might need to adjust it.
    // Creating this wrapper assumes CustomerDetailPage will be updated to use next/navigation useParams 
    // OR we can pass the id as a prop.
    // For now let's just render it, and we will update CustomerDetailPage to use next/navigation
    return <CustomerDetailPage />;
}
