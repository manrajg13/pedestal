import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "~/components/navbar";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <ClerkProvider
        appearance={{
          elements: {
            alert: "mt-6 -mb-4 border-white-100/[15%]",
            alertText: "text-white-100",
            modalContent: "mt-52",
            card: "bg-black-600 rounded-sm",
            headerTitle: "text-yellow-200",
            headerSubtitle: "text-white-100",
            formFieldLabel: "text-white-100",
            modalCloseButton:
              "text-white-100 rounded-none hover:bg-yellow-200 hover:brightness-125 hover:text-black-500",
            formButtonPrimary:
              "bg-yellow-200 hover:bg-yellow-200 rounded-sm hover:brightness-75",
            footerActionText: "mt-[7px] text-white-100",
            formFieldInput: "outline-none text-white-100/75 rounded-sm",
            formFieldHintText: "text-white-100/50",
            dividerText: "text-white-100/75",
            dividerLine: "bg-white-100/25",
            identityPreview: "border-white-100/25",
            identityPreviewText: "text-white-100",
            formHeaderTitle: "text-white-100",
            formHeaderSubtitle: "text-white-100/75",
            alternativeMethodsBlockButton:
              "bg-yellow-200 hover:bg-yellow-200 rounded-sm hover:brightness-75",
            otpCodeFieldInput: "text-white-100/50 border-yellow-200",
            socialButtons: "bg-black-600",
            socialButtonsBlockButton:
              "bg-white-100 rounded-sm hover:bg-white-100",
            formResendCodeLink: "text-yellow-200",
            footerActionLink: "text-lg text-yellow-200 hover:text-yellow-200",
          },
          layout: {
            socialButtonsPlacement: "bottom",
          },
        }}
      >
        <Head>
          <title>Pedestal</title>
          <meta name="description" content="A project showcase web-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster position="bottom-right" />
        <Navbar />
        <Component {...pageProps} />
      </ClerkProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
