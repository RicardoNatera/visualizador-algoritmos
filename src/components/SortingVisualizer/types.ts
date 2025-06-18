export interface SortStep {
  array: number[];              // Estado actual del array
  activeIndices: number[];      // Índices que se están comparando o swap
  swapped?: boolean;            // Marca si hubo intercambio
}
