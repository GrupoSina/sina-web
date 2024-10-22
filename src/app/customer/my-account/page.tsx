"use client";
import UserService from "@/services/models/user";
import { roleName } from "@/util/roleName";
import { Button, Chip, Input, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// | "INTERNAL_MANAGEMENT"
// | "INTERNAL_PARTNERS"
// | " INTERNAL_FINANCIAL_LEGAL"
// | "CLIENT_USER"
// | "CLIENT_OWNER"
// | "CLIENT_RESPONSIBLE";

export default function MyAccount() {
  const [userResponse, setUserResponse] = useState<IGetUserResponse>();
  const [loading, setLoading] = useState(true);

  const profileInfo = [
    {
      label: "Nome",
      value: userResponse?.user.firstName + " " + userResponse?.user.lastName,
    },

    {
      label: "Email",
      value: userResponse?.user.email,
    },
    {
      label: "Função",
      value: roleName.find((item) => item.key === userResponse?.user.role)
        ?.value,
    },
    {
      label: "Cliente",
      value: userResponse?.user.customer?.name,
    },
  ];

  useEffect(() => {
    fetchUser();
  }, []);
  async function fetchUser() {
    setLoading(true);
    try {
      const { fetchLoggedUser } = await UserService();
      const response = await fetchLoggedUser();
      setUserResponse(response);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar informações do usuário.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-3 w-full">
      <h1 className="text-[42px] text-[#21272A] font-bold">Minha Conta</h1>
      {loading ? (
        <div className="flex w-full items-center justify-center">
        <Spinner />
        </div>
      ) : (
        <div className="flex flex-col h-full w-full items-center text-black mt-20">
          {profileInfo.map((profile) => (
            <div
              key={profile.label}
              className={`${profile.value && 'border-1'} py-3 w-full flex flex-col items-center`}
            >
              {profile.value && (
                <div className="flex items-center gap-5">
                  <small>{profile.label}</small>
                  <Input isDisabled color="secondary" value={profile.value} />
                </div>
              )}
            </div>
          ))}
          <Link href="/customer/my-account/reset-password"><Button className="max-w-[320px]">Trocar senha</Button></Link>
          
        </div>
      )}
    </div>
  );
}