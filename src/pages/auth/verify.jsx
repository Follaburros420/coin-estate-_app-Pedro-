import VerificationPrompt from '@/components/Model/VerifyUser';
import { useMutationVerifyUserEmail } from '@/hooks/mutation';
import { useQueryGetUser } from '@/hooks/query';
import React from 'react';

export default function verify() {
  const { data:user } = useQueryGetUser()
  console.log({user})
  const { mutate: verifyUser } = useMutationVerifyUserEmail();

  const onContinue = () =>{
    verifyUser(user.email)
  }
  return (
    <div>
      <VerificationPrompt onContinue={onContinue} />
    </div>
  );
}
