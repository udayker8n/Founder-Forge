import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

async function getWaitlistEmails() {
  try {
    const { data: emails, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return {
      success: true,
      data: emails,
    }
  } catch (error) {
    console.error("Error fetching waitlist emails:", error)
    return {
      success: false,
      error: "Failed to fetch waitlist data",
      data: [],
    }
  }
}

export default async function AdminPage() {
  const { success, data: emails, error } = await getWaitlistEmails()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
          Waitlist Submissions
        </h1>

        {!success && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
            <h2 className="font-semibold mb-2">Error</h2>
            <p>{error || "An unknown error occurred"}</p>
          </div>
        )}

        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-[#D4B98C]/10 overflow-hidden overflow-x-auto">
          <div className="p-4 border-b border-[#D4B98C]/10 bg-[#D4B98C]/5">
            <div className="grid grid-cols-12 gap-4 font-medium text-[#D4B98C]">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2">IP Address</div>
              <div className="col-span-2">Status</div>
            </div>
          </div>

          <div className="divide-y divide-[#D4B98C]/10">
            {emails && emails.length > 0 ? (
              emails.map((entry, index) => (
                <div key={entry.id} className="p-4 grid grid-cols-12 gap-4 hover:bg-white/5">
                  <div className="col-span-1 text-gray-400">{index + 1}</div>
                  <div className="col-span-4">{entry.email}</div>
                  <div className="col-span-3 text-gray-400">{new Date(entry.created_at).toLocaleString()}</div>
                  <div className="col-span-2 text-gray-400 font-mono text-xs">{entry.ip_address}</div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        entry.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : entry.status === "approved"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {entry.status}
                    </span>

                    {entry.referrer && (
                      <div className="text-xs text-gray-400 mt-2 truncate max-w-[150px]" title={entry.referrer}>
                        via: {entry.referrer.startsWith("http") ? new URL(entry.referrer).hostname : entry.referrer}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                {success ? "No submissions yet" : "Could not load submissions"}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>This is a protected admin page. In a production environment, you should add authentication.</p>
        </div>
      </div>
    </div>
  )
}

