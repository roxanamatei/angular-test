CREATE TABLE [dbo].[Contact]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [Email] NVARCHAR(50) NOT NULL, 
    [Phone Number] NVARCHAR(50) NULL, 
    [City] NVARCHAR(50) NULL, 
    [Country] NVARCHAR(50) NULL, 
    [State] NVARCHAR(50) NULL, 
    [Birthay] DATE NULL, 
    [Gender] NVARCHAR(5) NULL, 
    [Category] NVARCHAR(50) NULL, 
    [Description] NVARCHAR(MAX) NULL, 
    [Photo] NVARCHAR(200) NULL
)
