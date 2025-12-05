import Desktop from "@/components/Desktop";
import ScaleWrapper from "@/components/ScaleWrapper";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-black">
      <ScaleWrapper>
        <Desktop />
      </ScaleWrapper>
    </main>
  );
}
