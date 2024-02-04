import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { TaskBoard } from "@/components/ui/task-board";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
    const { data, loading } = useIsAuth();
    return (
        <Wrapper>
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
