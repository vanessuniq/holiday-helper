import { useMemo, useState } from 'react'

/**
 * Holiday Helper V1
 * - Manage gift ideas by person
 *
 * Key React concepts:
 * - useState for state
 * - controlled inputs for forms
 * - list rendering with keys
 */

function App() {
  // People is an array of objects:  {id, name, ideas: [{id, text}]}
  const [people, setPeople] = useState([]);

  // Form state (controlled inputs)
  const [personName, setPersonName] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [ideaText, setIdeaText] = useState('');

  const selectedPerson = useMemo(() => {
    return people.find((p) => p.id === selectedPersonId) ?? null;
  }, [people, selectedPersonId]);

  function addPerson(e) {
    e.preventDefault();

    const name = personName.trim();
    if (!name) return;

    const newPerson = {
      id: crypto.randomUUID(),
      name,
      ideas: []
    };

    setPeople((prev) => [...prev, newPerson]);
    setPersonName('');

    // Auto select the person you just added (nice ux)
    setSelectedPersonId(newPerson.id);
  };

  function addIdea(e) {
    e.preventDefault();

    const text = ideaText.trim();
    if (!text || !selectedPerson) return;

    const newIdea = { id: crypto.randomUUID(), text };

    setPeople((prev) =>
      prev.map((p) =>
        p.id === selectedPersonId ? { ...p, ideas: [...p.ideas, newIdea] } : p
      )
    );

    setIdeaText('');
  };

  return (
    <div style={{ maxWidth: 860, margin: '40x auto', padding: 16 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Holiday Helper</h1>
        <p style={{ marginTop: 8 }}>
          Track gift ideas by person. We'll add budget, statuses, persistence, and
          deployment next.
        </p>
      </header>
      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}> Add a person</h2>
          <form onSubmit={addPerson}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Person name
              <input
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder='e.g., Mom'
                style={{ display: 'block', width: '100%', marginTop: 6, padding: 10 }}
              />
            </label>
            <button type='submit' style={{ padding: '10px 12px' }}>
              Add person
            </button>
          </form>

          <hr style={{ margin: '10px 0' }} />

          <h3>People</h3>
          {
            people.length === 0 ? (
              <p style={{ opacity: 0.7 }}>No one added yet</p>
            ) : (
              <ul>
                {people.map((p) => (
                  <li key={p.id}>
                    <button
                      type='button'
                      onClick={() => setSelectedPersonId(p.id)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: p.id === selectedPersonId ? 'underline' : 'nome',
                        fontWeight: p.id === selectedPersonId ? 700 : 400
                      }}
                    >
                      {p.name} ({p.ideas.length})
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        </div>

        <div style={{ padding: 16, border: '10px solid #ddd', borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>Add gift idea</h2>
          {
            !selectedPerson ? (
              <p style={{ opacity: 0.7 }}>Select a person first.</p>
            ) : (
              <div>
                <p style={{ marginTop: 0 }}>
                  Adding ideas for <b>{selectedPerson.name}</b>
                </p>
                <form onSubmit={addIdea}>
                  <label style={{ display: 'block', marginBottom: 8 }}>
                    Idea
                    <input
                      value={ideaText}
                      onChange={(e) => setIdeaText(e.target.value)}
                      placeholder='e.g., Digital photo frame'
                      style={{ display: 'block', width: '100%', marginTop: 6, padding: 10 }}
                    />
                  </label>
                  <button type='submit' style={{ padding: '10px 12px' }}>
                    Add idea
                  </button>
                </form>

                <h3 style={{ marginTop: 18 }}>Ideas</h3>
                {
                  selectedPerson.ideas.length === 0 ? (
                    <p style={{ opacity: 0.7 }}>No ideas yet.</p>
                  ) : (
                    <ul>
                      {selectedPerson.ideas.map((idea) => (
                        <li key={idea.id}>{idea.text}</li>
                      ))}
                    </ul>
                  )
                }
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default App
