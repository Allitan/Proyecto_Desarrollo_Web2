import styles from '../styles/FiltroMascotas.module.css'

type Filters = {
  species: string
  size: string
  age: string
  location: string
}

type Props = {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export default function FiltroMascotas({ filters, setFilters }: Props) {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    setFilters({
      species: '',
      size: '',
      age: '',
      location: ''
    })
  }

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.title}>Filtros</h3>
      
      <div className={styles.filterGroup}>
        <label htmlFor="species">Especie</label>
        <select
          id="species"
          value={filters.species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
          className={styles.select}
        >
          <option value="">Todas</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="size">Tamaño</label>
        <select
          id="size"
          value={filters.size}
          onChange={(e) => handleFilterChange('size', e.target.value)}
          className={styles.select}
        >
          <option value="">Todos</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="age">Edad</label>
        <select
          id="age"
          value={filters.age}
          onChange={(e) => handleFilterChange('age', e.target.value)}
          className={styles.select}
        >
          <option value="">Todas</option>
          <option value="0-1">Cachorro (0-1 año)</option>
          <option value="1-3">Joven (1-3 años)</option>
          <option value="3-7">Adulto (3-7 años)</option>
          <option value="7-15">Senior (7+ años)</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="location">Ubicación</label>
        <input
          type="text"
          id="location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          placeholder="Ciudad o estado"
          className={styles.input}
        />
      </div>

      <button onClick={clearFilters} className={styles.clearButton}>
        Limpiar Filtros
      </button>
    </div>
  )
}
