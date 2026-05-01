# Mane-Kelsa Security Specification

## Data Invariants
1. A user profile must match the authenticated UID.
2. A worker listing must be created by an authenticated user and point back to their UID.
3. Ratings must be between 1 and 5.
4. Timestamps must be server-generated.
5. Users cannot verify themselves (isVerified is admin-only).
6. Reviews must be authored by a signed-in user and cannot be edited once submitted.

## The Dirty Dozen Payloads
1. **Identity Theft**: Update another user's profile `name` field.
2. **Self-Verification**: Create a worker profile with `isVerified: true`.
3. **Ghost Worker**: Create a worker profile where `userId` doesn't match `request.auth.uid`.
4. **Rating Injection**: Submit a review with `rating: 99`.
5. **PII Leak**: Read `/users/{anotherUserId}` email as a non-owner.
6. **Shadow Fields**: Add a `isAdmin: true` field to a user profile.
7. **Timestamp Spoofing**: Provide a custom `createdAt` date.
8. **Orphaned Review**: Post a review to a non-existent `workerId`.
9. **Status Hijacking**: Update a review authored by someone else.
10. **ID Poisoning**: Create a document with a 1KB long junk string as ID.
11. **Resource Exhaustion**: Post a 1MB string in the `bio` field.
12. **Blanket Query**: Attempt to list all users' private info without a filter.

## Test Runner (Logic)
The `firestore.rules` will be validated against these scenarios ensuring `PERMISSION_DENIED`.
