export default interface VoteWriteDto {
  date: Date,
  choice_id: number,
  voter_id: number | null,
}
