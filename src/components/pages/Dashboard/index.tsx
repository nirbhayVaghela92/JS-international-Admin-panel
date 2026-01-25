"use client";
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import { OverviewCardsGroup } from "@/components/shared/Cards/overview-cards";
import { OverviewCardsSkeleton } from "@/components/shared/Cards/overview-cards/skeleton";
import { useGetDashboardData } from "@/hooks/queries";

const Dashboard = () => {
    const { data: dashboardData, isLoading } = useGetDashboardData();

    return (
        <>
            <Breadcrumb pageName="Dashboard" />
            {isLoading ? (
                <OverviewCardsSkeleton />
            ) : (
                <OverviewCardsGroup data={dashboardData} />
            )}
        </>
    );
}

export default Dashboard;