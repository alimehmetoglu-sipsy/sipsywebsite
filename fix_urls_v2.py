import re
import sys

files_to_fix = [
    "components/ClientHome.tsx",
    "components/SolutionCard.tsx",
    "components/Navigation.tsx"
]

# Fix template literals that have getMediaURL function calls in them
# Replace {`getMediaURL(xxx)`} with {getMediaURL(xxx)}
pattern = r'\{\`(getMediaURL\([^)]+\))\`\}'
replacement = r'{\1}'

for file_path in files_to_fix:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content

        # Replace the pattern
        content = re.sub(pattern, replacement, content)

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Fixed template literals in: {file_path}")
        else:
            print(f"No changes needed: {file_path}")

    except Exception as e:
        print(f"Error fixing {file_path}: {e}")
        sys.exit(1)

print("\nAll files fixed successfully!")
