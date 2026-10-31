import { useId, useState } from 'react'
import { SMART_PEOPLE } from '../data/smartPeople'

export function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  const [people, setPeople] = useState(initialData)
  const [query, setQuery] = useState('')
  const [minIq, setMinIq] = useState(160)
  const [sortBy, setSortBy] = useState('iq-desc')

  const queryId = useId()
  const iqId = useId()
  const sortId = useId()

  const visiblePeople = people
    .filter(
      (person) =>
        person.name
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        person.iq >= minIq,
    )
    .toSorted((a, b) =>
      sortBy === 'iq-desc'
        ? b.iq - a.iq
        : a.age - b.age,
    )

  function handleDelete(id) {
    setPeople((previousPeople) =>
      previousPeople.filter((person) => person.id !== id),
    )
  }

  function handleReset() {
    setPeople(initialData)
  }

  return (
    <section aria-labelledby="directory-title">
      <h2 id="directory-title">Scientist & Pioneer Directory</h2>

      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <p>
          <label htmlFor={queryId}>Name</label>
          <input
            id={queryId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </p>

        <p>
          <label htmlFor={iqId}>Min IQ</label>
          <input
            id={iqId}
            type="number"
            value={minIq}
            onChange={(event) => {
              const nextValue = event.target.valueAsNumber

              setMinIq(Number.isNaN(nextValue) ? 0 : nextValue)
            }}
          />
        </p>

        <p>
          <label htmlFor={sortId}>Sort by</label>
          <select
            id={sortId}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="iq-desc">IQ: High to Low</option>
            <option value="age-asc">Age: Young to Old</option>
          </select>
        </p>
      </form>

      <button
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>

      <output
        role="status"
        aria-live="polite"
      >
        Found {visiblePeople.length} pioneers
      </output>

      <ul>
        {visiblePeople.map((person) => (
          <li key={person.id}>
            <span>
              {person.name} - Age {person.age} - IQ {person.iq}
            </span>{' '}
            <button
              type="button"
              onClick={() => handleDelete(person.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}