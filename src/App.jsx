import { useEffect, useState } from "react";

function App() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/team")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error(error));
  }, []);

  const toggleAvailability = async (id) => {
    const member = teamMembers.find(
      (member) => member.id === id
    );

    const updatedAvailability = !member.available;

    const response = await fetch(
      `http://localhost:5000/api/team/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          available: updatedAvailability,
        }),
      }
    );

    const updatedMember = await response.json();

    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? updatedMember : member
      )
    );
  };

  return (
    <div className="container">
      <h1>Team Availability Tracker</h1>

      <div className="card">
        <div className="table-header">
          <span>Team Member</span>
          <span>Status</span>
        </div>

        {teamMembers.map((member) => (
          <div className="member-row" key={member.id}>
            <div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>

            <div className="member-actions">
              <span
                className={
                  member.available
                    ? "status available"
                    : "status busy"
                }
              >
                <span className="dot"></span>
                {member.available
                  ? "AVAILABLE"
                  : "BUSY"}
              </span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={member.available}
                  onChange={() =>
                    toggleAvailability(member.id)
                  }
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;