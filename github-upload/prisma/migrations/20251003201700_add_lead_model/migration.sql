-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "domain" TEXT,
    "toolUsed" TEXT,
    "lastToolUsed" TEXT,
    "lastDomainChecked" TEXT,
    "toolUsageCount" INTEGER NOT NULL DEFAULT 1,
    "lastActivity" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "results" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");
