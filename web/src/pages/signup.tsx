import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useRegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/to-error-map";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { Formik, Form } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
    useIsAuth();
    const [registerMut] = useRegisterMutation();
    const router = useRouter();
    const client = useApolloClient();
    return (
        <div>
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <a href="/">
                        <Image
                            src="/logo.svg"
                            className="h-8 w-auto"
                            height={20}
                            width={20}
                            alt="logo"
                        />
                    </a>
                </div>
                <div
                    style={{
                        marginTop: "8.8vh",
                    }}
                    className="w-80 ml-auto mr-auto  flex flex-col items-center justify-center"
                >
                    <p className="text-5xl font-semibold mb-5">Sign up</p>
                    <Formik
                        initialValues={{ name: "", email: "", password: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const res = await registerMut({
                                variables: {
                                    options: values,
                                },
                            });
                            if (res.data?.register.errors) {
                                setErrors(toErrorMap(res.data.register.errors));
                            } else if (res.data?.register.user) {
                                router.push("/app");
                                await client.resetStore();
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name="name"
                                    placeholder="Dwight Schrute"
                                    label="Name"
                                    shadow
                                />
                                <InputField
                                    name="email"
                                    placeholder="dwight@dundermifflin.com"
                                    label="Email"
                                    shadow
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="bears, beets, battlestar galactica!"
                                    label="Password"
                                    shadow
                                />
                                <Button
                                    loading={isSubmitting}
                                    type="submit"
                                    label="Sign up"
                                    className="mt-5"
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-600 text-smol mt-6">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="underline hover:text-primary-color transition-all"
                        >
                            Login
                        </a>
                    </p>
                    {/* TODO – add functionality to forget your password, if that makes sense */}
                    {/* <p className="text-gray-600 text-smol mt-2">
                        <a
                            href="/forgot-password"
                            className="underline hover:text-primary-color transition-all"
                        >
                            Forgot password?
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Signup;
