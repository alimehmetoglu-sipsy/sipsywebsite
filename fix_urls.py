import re
import sys

files_to_fix = [
    "components/ClientHome.tsx",
    "components/SolutionCard.tsx",
    "components/Navigation.tsx"
]

pattern = r"\$\{process\.env\.NEXT_PUBLIC_STRAPI_URL \|\| 'http://localhost:1337'\}\$\{([^}]+)\.url\}"
replacement = r"getMediaURL(\1.url)"

for file_path in files_to_fix:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content

        # Replace the pattern
        content = re.sub(pattern, replacement, content)

        # Add import if needed and not present
        if content != original_content and "import { getMediaURL }" not in content:
            # Add import at the top
            content = "import { getMediaURL } from '../lib/strapi';\n" + content

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Fixed: {file_path}")
        else:
            print(f"No changes needed: {file_path}")

    except Exception as e:
        print(f"Error fixing {file_path}: {e}")
        sys.exit(1)

print("\nAll files fixed successfully!")
