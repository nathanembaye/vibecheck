export interface VibecheckInterfaceProps {
  navigation,
}

export interface VibecheckInterfaceState {
  query: string,
  latestQuery: string | null,
  results,
  signal: Function,
  activeSong: number | null,
}