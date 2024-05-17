import DetailHeader from "../_components/layouts/header/DetailHeader";

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
