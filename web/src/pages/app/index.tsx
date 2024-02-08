import { Wrapper } from "@/components/shared/wrapper";
// import { Welcome } from "@/components/ui/welcome";
// import { useIsAuth } from "@/utils/use-is-auth";
import { ExploreCollege } from "@/components/shared/explore-college";
import { Meta } from "@/components/shared/meta";
import { Spinner } from "@/components/shared/spinner";
import { useIsAuth } from "@/utils/use-is-auth";
import Head from "next/head";

export default function MainApp() {
    const { data, loading } = useIsAuth();
    return (
        <div>
            <Head>
                <Meta title={"Colleges"} />
                <title>Dashboard - Lumos</title>
            </Head>
            <Wrapper>
                <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">colleges</p>
                </div>
                {!loading ? (
                    <ExploreCollege data={data} />
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
