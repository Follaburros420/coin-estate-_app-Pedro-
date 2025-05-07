import VerifyCodePage from '@/components/Model/VerificationCode';
import VerificationPrompt from '@/components/Model/VerifyUser';
import { useMutationVerifyCode, useMutationVerifyUserEmail } from '@/hooks/mutation';
import { useQueryGetUser } from '@/hooks/query';
import React, { useState } from 'react';

export default function VerifyPage() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { data: user } = useQueryGetUser();

  const onSuccess = () => {
    setIsEmailSent(true);
  };

  console.log({ user });
  const { mutate: verifyUser, isSuccess, isPending: isLoadingEmail } = useMutationVerifyUserEmail(onSuccess);
  const { mutate: mutateVerifyCode, isPending: isLoadingVerify } = useMutationVerifyCode();
  console.log('🚀 ~ verify ~ isSuccess:', isSuccess);

  const onContinue = () => {
    verifyUser(user.email);
  };
  const handleVerifyCode = (code) => {
    mutateVerifyCode(code);
  };
  return (
    <div>
      {isEmailSent ? (
        <VerifyCodePage
          handleRecent={onContinue}
          isLoadingVerify={isLoadingVerify}
          handleVerifyCode={handleVerifyCode}
        />
      ) : (
        <VerificationPrompt isLoadingEmail={isLoadingEmail} onContinue={onContinue} />
      )}
    </div>
  );
}
