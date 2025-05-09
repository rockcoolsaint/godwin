// src/api/party/getLeaderboard.ts
import { makeClientRequest } from '../clientRequest'
import { DirectPartyLeaderboardEntry, PartyLeaderboardEntry, TeamPartyLeaderboardEntry } from 'src/api/auction/types'

export async function getTeamLeaderboard(): Promise<TeamPartyLeaderboardEntry[]> {
  const response = await makeClientRequest({
    method: 'GET',
    path: 'api/auctions/team-party-leaderboard'
  })
  return response
}

export async function getPartyLeaderboard(): Promise<PartyLeaderboardEntry[]> {
  const response = await makeClientRequest({
    method: 'GET',
    path: 'api/auctions/party-leaderboard'
  })
  return response
}

export async function getNextSaturdayPartyLeaderboard(): Promise<PartyLeaderboardEntry[]> {
  const response = await makeClientRequest({
    method: 'GET',
    path: 'api/auctions/party-nextsat-leaderboard'
  })
  return response
}

export async function getDirectPartyLeaderboard(): Promise<PartyLeaderboardEntry[]> {
  const response = await makeClientRequest({
    method: 'GET',
    path: 'api/auctions/party-directleaderboard'
  })
  return response
}

export async function getNextSaturdayDirectPartyLeaderboard(): Promise<DirectPartyLeaderboardEntry[]> {
  const response = await makeClientRequest({
    method: 'GET',
    path: 'api/auctions/party-nextsat-directleaderboard'
  })
  return response
}

