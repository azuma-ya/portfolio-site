import DetailHeader from "@/components/layouts/header/DetailHeader";

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DetailHeader />
      {children}
    </>
  );
}
