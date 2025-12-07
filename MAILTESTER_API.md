# MailTester Ninja API Documentation

## API Endpoint
```
https://happy.mailtester.ninja/ninja
```

## Authentication
- **Parameter**: `key` (required)
- **Your Key**: Provided in environment variables

## Request Format
```
GET https://happy.mailtester.ninja/ninja?email=john.doe@email.com&key=yourkey
```

### Parameters
- `email` (required): The email address to verify
- `key` (required): Your subscription key (without "{" and "}")

## Response Format
```json
{
  "email": "john.doe@email.com",
  "user": "John Doe",
  "domain": "email.com",
  "mx": "mx.sender-email.com",
  "code": "ok",
  "message": "Accepted",
  "connections": 1
}
```

### Response Fields
- **email**: Email address checked
- **user**: Email user
- **domain**: Email address domain
- **mx**: Mail server
- **code**: Email validity
  - `ok`: Valid
  - `ko`: Invalid
  - `mb`: Unverifiable
- **message**: Status message
  - Accepted
  - Limited
  - Rejected
  - Catch-All
  - No Mx
  - Mx Error
  - Timeout
  - SPAM Block
- **connections**: Simultaneous connections per key

## Rate Limits

### Pro Plan
- **35 emails every 30 seconds**
- **100k per day**
- **1 per 860ms**

### Ultimate Plan (YOUR PLAN)
- **170 emails every 30 seconds**
- **500k per day**
- **1 per 170ms**

## Important Notes
1. MailTester Ninja is an **EMAIL VERIFICATION** service only
2. It does NOT find emails - it only verifies if an email exists
3. You need to GENERATE/FIND the email first, then verify it
4. For email finding, you'll need a separate service or pattern-based generation

## Implementation Strategy
Since MailTester only verifies emails, we need to:
1. Generate potential email patterns (firstname.lastname@domain.com, etc.)
2. Verify each pattern using MailTester
3. Return the valid ones

Common email patterns to try:
- firstname.lastname@domain.com
- firstname@domain.com
- firstnamelastname@domain.com
- f.lastname@domain.com
- firstname_lastname@domain.com
- lastname.firstname@domain.com
