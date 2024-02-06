import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useUpdateNameMutation } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "sonner";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
    const { data, loading } = useIsAuth();
    const [updateNameMut] = useUpdateNameMutation();
    const client = useApolloClient();

    return (
        <Wrapper>
            <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                <p className="max-w-xl mx-auto text-lg blair">settings</p>
            </div>
            <div className="max-w-xl mx-auto p-4">
                {!loading ? (
                    <>
                        <Formik
                            initialValues={{
                                name: data?.me?.name,
                            }}
                            onSubmit={async (values, { setErrors }) => {
                                await updateNameMut({
                                    variables: {
                                        name: values.name || "",
                                    },
                                });
                                toast.success(
                                    "Account name changed successfully."
                                );
                                await client.resetStore();
                            }}
                        >
                            {({ isSubmitting, values: { name } }) => (
                                <Form>
                                    <InputField
                                        name="name"
                                        placeholder="Dwight Schrute"
                                        label="Name"
                                        fullWidth
                                    />
                                    <div
                                        className={
                                            "transition-all ml-auto mr-0 w-44 mt-5"
                                        }
                                    >
                                        <Button
                                            loading={isSubmitting}
                                            disabled={
                                                name?.trim() === data?.me?.name
                                            }
                                            type="submit"
                                            label="Update details"
                                            colored
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <label
                            className={"text-sm text-slate-600 text-opacity-60"}
                        >
                            Email{" "}
                            <span className=" menlo">(can't be changed)</span>
                        </label>
                        <br />
                        <p
                            className={
                                "text-slate-600 transition-all text-smol placeholder-gray-600 py-1.5 px-3 mt-1.5 mb-1.5 bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-border-blue-100"
                            }
                        >
                            {data?.me?.email}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default Settings;
