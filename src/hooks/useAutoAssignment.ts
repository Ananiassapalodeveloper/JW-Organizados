// hooks/useAutoAssignment.ts
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { presidentType } from "@/types/reuniaoMeioSemanaDTO/type";

interface UseAutoAssignmentProps {
  brothers: presidentType[];
  setPresidentId: (id: string) => void;
  setPrayerId: (id: string) => void;
}

export const useAutoAssignment = ({
  brothers,
  setPresidentId,
  setPrayerId,
}: UseAutoAssignmentProps) => {
  const autoAssign = useCallback(() => {
    if (!brothers || brothers.length < 2) return false;

    // Sort brothers by number of assignments (ascending)
    const sortedBrothers = [...brothers].sort(
      (a, b) => a._count.PartesIniciasDono - b._count.PartesIniciasDono
    );

    // Prefer elders for president role if available
    const elders = sortedBrothers.filter((b) => b.estado === "BATIZADO");
    const otherBrothers = sortedBrothers.filter((b) => b.estado !== "BATIZADO");

    // Select president (prefer elder with fewest assignments)
    const presidentBrother = elders.length > 0 ? elders[0] : otherBrothers[0] || sortedBrothers[0];

    // Select prayer brother (next brother with fewest assignments who isn't the president)
    const prayerCandidates = sortedBrothers.filter(
      (b) => b.id !== presidentBrother.id
    );
    const prayerBrother = prayerCandidates[0];

    // Set values
    setPresidentId(presidentBrother.id);
    setPrayerId(prayerBrother.id);

    toast({
      title: "Designação automática",
      description: `Presidente: ${presidentBrother.nome}, Oração: ${prayerBrother.nome}`,
    });

    return true;
  }, [brothers, setPresidentId, setPrayerId]);

  return { autoAssign };
};