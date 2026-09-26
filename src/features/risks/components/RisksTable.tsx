import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatStatusLabel } from "@/lib/format";
import { RiskLevelBadge } from "./RiskLevelBadge";
import { RiskStatusBadge } from "./RiskStatusBadge";
import type { Risk } from "../types";

interface RisksTableProps {
  risks: Risk[];
  onSelect: (risk: Risk) => void;
}

export function RisksTable({ risks, onSelect }: RisksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Risk</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Probability</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {risks.map((risk) => (
          <TableRow
            key={risk.id}
            className="cursor-pointer"
            onClick={() => onSelect(risk)}
          >
            <TableCell>
              <p className="font-medium text-foreground">{risk.title}</p>
              {risk.target_date && (
                <p className="text-xs text-muted-foreground">
                  Target {formatDate(risk.target_date)}
                </p>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatStatusLabel(risk.category)}
            </TableCell>
            <TableCell>{risk.probability}</TableCell>
            <TableCell>{risk.impact}</TableCell>
            <TableCell className="font-medium text-foreground">
              {risk.risk_score}
            </TableCell>
            <TableCell>
              <RiskLevelBadge level={risk.risk_level} />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {risk.owner_email}
            </TableCell>
            <TableCell>
              <RiskStatusBadge status={risk.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
