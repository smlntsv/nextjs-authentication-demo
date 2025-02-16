-- ----------------------------
-- Registered users
-- ----------------------------
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX "users_email_key" ON "users" USING btree ("email");

-- ----------------------------
-- Users waiting for email confirmation
-- ----------------------------
CREATE TABLE IF NOT EXISTS "pending_users" (
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "token" varchar(255) NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL
);

CREATE UNIQUE INDEX "pending_users_email_key" ON "pending_users" USING btree ("email");
CREATE UNIQUE INDEX "pending_users_token_key" ON "pending_users" USING btree ("token");

-- ----------------------------
-- Store active user sessions
-- ----------------------------
CREATE TABLE IF NOT EXISTS "sessions" (
    "user_id" uuid NOT NULL,
    "token" varchar(255) NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "sessions_token_key" ON "sessions" USING btree ("token");

-- ----------------------------
-- Password reset schema
-- ----------------------------
CREATE TABLE IF NOT EXISTS "password_resets" (
    "user_id" uuid NOT NULL,
    "token" varchar(255) NOT NULL,
    "is_used" boolean NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    CONSTRAINT "password_resets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "password_resets_token_key" ON "password_resets" USING btree ("token");
