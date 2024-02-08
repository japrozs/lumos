import { Meta } from "@/components/shared/meta";
import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { TaskBoard } from "@/components/ui/task-board";
import { useIsAuth } from "@/utils/use-is-auth";
import Head from "next/head";
import React from "react";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
    const { data, loading } = useIsAuth();
    return (
        <Wrapper>
            <Head>
                <Meta title={"Task Board Lumos"} />
                <title>Task Board – Lumos</title>
            </Head>
            {data && data.me && !loading ? (
                <TaskBoard data={data} />
            ) : (
                <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                    <Spinner />
                </div>
            )}
        </Wrapper>
    );
};

export default Tasks;
