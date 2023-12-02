import { Card } from "@chakra-ui/react";

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-app-bg min-h-[100vh] flex justify-center items-center">
      <Card as="div" className="w-full max-w-[480px] mx-[20px] p-[30px] text-center">{children}</Card>
    </main>
  );
};

export default Contents;
