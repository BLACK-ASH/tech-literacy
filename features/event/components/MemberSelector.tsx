"use client";

import { Suspense, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ParticipationType } from "@/lib/Database/Models/participation.model";
import { User } from "@/lib/Auth/auth-client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MemberSelector = ({
  form,
  maxMembers = 1,
}: {
  form: UseFormReturn<ParticipationType>;
  maxMembers?: number;
}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);

  // ----------------- SEARCH USERS -----------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!search) return setResults([]);

    const t = setTimeout(async () => {
      const res = await fetch(`/api/users/search?query=${search}`);
      const data = await res.json();
      setResults(data);
    }, 300);

    return () => clearTimeout(t);
  }, [search]);

  // ----------------- ADD MEMBER -----------------
  const addMember = (email: string) => {
    const user = results.find((u) => u.email === email);
    if (!user) return;

    const current = form.getValues("members");

    // prevent duplicates
    if (current.some((m) => m.email === user.email)) return;

    form.setValue("members", [
      ...current,
      {
        name: user.name || "Unknown",
        email: user.email,
      },
    ]);

    setSearch("");
  };

  return (
    <div>
      <Field>
        <FieldLabel>Participants</FieldLabel>

        {/* Selected Members */}
        <div className="mt-3 space-y-2">
          {form.watch("members").map((m, i) => (
            <div
              key={`member-${i}-${m.email}`}
              className="border p-2 rounded flex justify-between"
            >
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-500">{m.email}</p>
              </div>

              {i !== 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const updated = form
                      .getValues("members")
                      .filter((_, idx) => idx !== i);

                    form.setValue("members", updated);
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
        {/* Add Member Select */}
        {form.watch("members").length < maxMembers && (
          <Popover>
            <PopoverTrigger className="text-primary" asChild>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Member
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="mt-4 space-y-2">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search user..."
                />
                  {results.length === 0 && <p>No users found</p>}

                  {results
                    .filter(
                      (u) => u.email !== form.watch("members")[0]?.email // prevent self-selection
                    )
                    .map((u) => (
                      <div key={u.email} onClick={() => addMember(u.email)}>
                        {u.name} — {u.email}
                      </div>
                    ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </Field>
    </div>
  );
};

export default MemberSelector;
