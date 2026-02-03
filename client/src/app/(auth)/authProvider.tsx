import type { AppProps } from "next/app";
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { I18n } from "aws-amplify/utils";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

I18n.putVocabularies({
  vi: {
    "Sign in": "Đăng nhập",
    "Signing in": "Đang đăng nhập",
    "Create Account": "Tạo tài khoản",
  },
});
I18n.setLanguage("vi");

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          THUÊ
          <span className="text-secondary-600 font-light hover:!text-primary-300">
            {" "}
            NHÀ
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Chào mừng đến với THUÊ NHÀ</span> Vui lòng
          đăng nhập để tiếp tục.
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Chưa có tài khoản?{" "}
            <button
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Đăng ký ngay!
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Bạn là?"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tenant">Người thuê</Radio>
            <Radio value="manager">Quản lý</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Đã có tài khoản?{" "}
            <button
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Đăng nhập
            </button>
          </p>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Nhập email của bạn",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Nhập mật khẩu của bạn",
      label: "Mật khẩu",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Nhập tên đăng nhập của bạn",
      label: "Tên đăng nhập",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Nhập email của bạn",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Nhập mật khẩu của bạn",
      label: "Mật khẩu",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Nhập lại mật khẩu của bạn",
      label: "Xác nhận mật khẩu",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;
